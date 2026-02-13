/**
 * Parse simplified FamilySearch census JSON data
 * Extracts record groups (households) and people within them
 */

/**
 * Get all record elements from census data
 */
export const getRecords = (censusData) => {
  return censusData.records || [];
};

/**
 * Get person data for a given person ID
 */
export const getPerson = (censusData, personId) => {
  // Find the person across all records
  for (const record of censusData.records) {
    const person = record.people.find(p => p.id === personId);
    if (person) {
      const hasPersonId = person.attachedPersons && person.attachedPersons.length > 0;
      const hasHint = person.hints && person.hints.length > 0;

      return {
        id: person.id,
        givenName: person.givenName,
        surname: person.surname,
        fullName: `${person.givenName} ${person.surname}`.trim(),
        relationship: normalizeRelationship(person.relationship),
        sex: person.sex,
        age: person.age,
        race: person.race,
        isPrimary: person.isPrimary || false,
        isVisible: person.isVisible,
        attachmentStatus: hasPersonId ? 'attached' : hasHint ? 'hint' : 'none',
        attachedPid: person.attachedPersons?.[0]?.pid || null,
        events: person.events || [],
        relationships: person.relationships || []
      };
    }
  }
  return null;
};

/**
 * Normalize relationship text to standard values
 */
const normalizeRelationship = (rel) => {
  if (!rel) return '';
  const lower = rel.toLowerCase();
  if (lower.includes('head') || lower.includes('self')) return 'Primary';
  if (lower.includes('wife') || lower.includes('husband')) return 'Spouse';
  if (lower.includes('son') || lower.includes('daughter') || lower.includes('child')) return 'Child';
  if (lower.includes('father') || lower.includes('mother') || lower.includes('parent')) return 'Parent';
  if (lower.includes('brother') || lower.includes('sister') || lower.includes('sibling')) return 'Sibling';
  return rel;
};

/**
 * Get all people in a record group
 */
export const getRecordGroupPeople = (censusData, recordId) => {
  const record = censusData.records.find(r => r.id === recordId);
  if (!record) return [];

  return record.people.map(person => {
    const hasPersonId = person.attachedPersons && person.attachedPersons.length > 0;
    const hasHint = person.hints && person.hints.length > 0;

    return {
      id: person.id,
      givenName: person.givenName,
      surname: person.surname,
      fullName: `${person.givenName} ${person.surname}`.trim(),
      relationship: normalizeRelationship(person.relationship),
      sex: person.sex,
      age: person.age,
      race: person.race,
      isPrimary: person.isPrimary || false,
      isVisible: person.isVisible,
      attachmentStatus: hasPersonId ? 'attached' : hasHint ? 'hint' : 'none',
      attachedPid: person.attachedPersons?.[0]?.pid || null,
      relationships: person.relationships || []
    };
  });
};

/**
 * Get all record groups with their people
 */
export const getAllRecordGroups = (censusData) => {
  const records = getRecords(censusData);

  return records.map(record => {
    const people = getRecordGroupPeople(censusData, record.id);

    // Sort people so primary person appears first
    const sortedPeople = [...people].sort((a, b) => {
      if (a.isPrimary && !b.isPrimary) return -1;
      if (!a.isPrimary && b.isPrimary) return 1;
      return 0;
    });

    // Find primary person for group name
    const primary = sortedPeople.find(p => p.relationship === 'Primary');
    const groupName = primary
      ? `${primary.fullName} Household`
      : 'Unnamed Household';

    return {
      id: record.id,
      name: groupName,
      primary: primary?.fullName || '',
      people: sortedPeople
    };
  }).filter(group => group.people.length > 0); // Only include groups with people
};

/**
 * Filter record groups by search term
 */
export const filterRecordGroups = (recordGroups, searchTerm) => {
  if (!searchTerm) return recordGroups;

  const lower = searchTerm.toLowerCase();

  return recordGroups.map(group => ({
    ...group,
    people: group.people.filter(person =>
      person.fullName.toLowerCase().includes(lower) ||
      person.givenName.toLowerCase().includes(lower) ||
      person.surname.toLowerCase().includes(lower)
    )
  })).filter(group => group.people.length > 0);
};

/**
 * Get all record groups without filtering (for AutoSuggest options)
 * Returns ALL record groups including those normally filtered out
 */
export const getAllRecordGroupsUnfiltered = (censusData) => {
  const records = getRecords(censusData);

  return records.map(record => {
    // Get all people without filtering
    const people = record.people.map(person => {
      const hasPersonId = person.attachedPersons && person.attachedPersons.length > 0;
      const hasHint = person.hints && person.hints.length > 0;

      return {
        id: person.id,
        givenName: person.givenName,
        surname: person.surname,
        fullName: `${person.givenName} ${person.surname}`.trim(),
        relationship: normalizeRelationship(person.relationship),
        sex: person.sex,
        age: person.age,
        race: person.race,
        isPrimary: person.isPrimary || false,
        attachmentStatus: hasPersonId ? 'attached' : hasHint ? 'hint' : 'none',
        attachedPid: person.attachedPersons?.[0]?.pid || null,
        events: person.events || [],
        relationships: person.relationships || []
      };
    });

    // Sort people so primary person appears first
    const sortedPeople = [...people].sort((a, b) => {
      if (a.isPrimary && !b.isPrimary) return -1;
      if (!a.isPrimary && b.isPrimary) return 1;
      return 0;
    });

    // Find primary person for group name (use isPrimary flag)
    const primary = sortedPeople.find(p => p.isPrimary);
    const groupName = primary
      ? `${primary.fullName} Household`
      : sortedPeople[0]?.fullName
        ? `${sortedPeople[0].fullName} Household`
        : 'Unnamed Household';

    return {
      id: record.id,
      name: groupName,
      primary: primary?.fullName || sortedPeople[0]?.fullName || '',
      people: sortedPeople
    };
  });
};

/**
 * Get all names from the document (for AutoSuggest options)
 * Returns ALL names without filtering
 */
export const getAllNamesUnfiltered = (censusData) => {
  const allGroups = getAllRecordGroupsUnfiltered(censusData);
  return allGroups.flatMap(group => group.people);
};

/**
 * Find potential matching records based on given name and surname
 * Supports partial matching (finding family members in households)
 *
 * @param {object} censusData - The census data object
 * @param {object} criteria - Search criteria {givenName, surname}
 * @returns {array} Array of matching records with details
 */
export const findPotentialMatches = (censusData, criteria) => {
  const { givenName, surname } = criteria;
  const records = getRecords(censusData);
  const matches = [];

  if (!givenName) {
    return matches; // No search criteria
  }

  records.forEach(record => {
    const people = record.people || [];

    // Check if any person in record matches the search
    const matchingPerson = people.find(person => {
      // Match if givenName matches exactly (case-insensitive)
      const givenMatch = person.givenName?.toLowerCase() === givenName?.toLowerCase();

      // Match surname loosely (optional or matching)
      const surnameMatch = !surname ||
        surname === '' ||
        person.surname?.toLowerCase() === surname?.toLowerCase();

      return givenMatch && surnameMatch;
    });

    if (matchingPerson) {
      // Find primary person for display
      const primary = people.find(p => p.isPrimary) || people[0];

      // Get all relationships (names of other people in household)
      const relationships = people
        .filter(p => p.id !== primary.id)
        .map(p => {
          const fullName = `${p.givenName || ''} ${p.surname || ''}`.trim();
          return fullName || p.givenName || 'Unknown';
        })
        .filter(name => name);

      matches.push({
        recordId: record.id,
        matchedPersonId: matchingPerson.id,
        primaryId: primary.id,
        primaryName: `${primary.givenName || ''} ${primary.surname || ''}`.trim() || primary.givenName || 'Unknown',
        primaryAge: primary.age || 'Unknown',
        householdSize: people.length,
        relationships: relationships,
        allPeople: people,
        record: record
      });
    }
  });

  return matches;
};
