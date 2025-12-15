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
        attachmentStatus: hasPersonId ? 'attached' : hasHint ? 'hint' : 'none',
        attachedPid: person.attachedPersons?.[0]?.pid || null,
        events: person.events || []
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
      attachmentStatus: hasPersonId ? 'attached' : hasHint ? 'hint' : 'none',
      attachedPid: person.attachedPersons?.[0]?.pid || null
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

    // Find primary person for group name
    const primary = people.find(p => p.relationship === 'Primary');
    const groupName = primary
      ? `${primary.fullName} Household`
      : 'Unnamed Household';

    return {
      id: record.id,
      name: groupName,
      primary: primary?.fullName || '',
      people
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
        attachmentStatus: hasPersonId ? 'attached' : hasHint ? 'hint' : 'none',
        attachedPid: person.attachedPersons?.[0]?.pid || null,
        events: person.events || []
      };
    });

    // Find primary person for group name
    const primary = people.find(p => p.relationship === 'Primary');
    const groupName = primary
      ? `${primary.fullName} Household`
      : people[0]?.fullName
        ? `${people[0].fullName} Household`
        : 'Unnamed Household';

    return {
      id: record.id,
      name: groupName,
      primary: primary?.fullName || people[0]?.fullName || '',
      people
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
