/**
 * Validate that the task was completed correctly
 * Task: Add John Ockerman and his family (Reamy, Isaic, Joseph, George, Christopher)
 *
 * @param {Object} censusData - The census data object
 * @returns {Object} Validation results
 */
export function validateTask(censusData) {
  const results = {
    johnAdded: false,
    reamyAdded: false,
    isaicAdded: false,
    josephAdded: false,
    georgeAdded: false,
    christopherAdded: false,
    allPeopleAdded: false,
    correctGroup: false,
    johnRecordId: null,
    peopleDetails: {}
  };

  // Required people for John Ockerman's household
  // Note: In the data, only John has surname "Ockerman", others may have empty surnames
  // For spouse, name might be "Heamy" or "Reamy"
  const requiredPeople = [
    { name: 'John', surname: 'Ockerman', key: 'johnAdded', requireSurname: true },
    { name: 'Reamy', alternateNames: ['Heamy'], key: 'reamyAdded', requireSurname: false },
    { name: 'Isaic', key: 'isaicAdded', requireSurname: false },
    { name: 'Joseph', key: 'josephAdded', requireSurname: false },
    { name: 'George', key: 'georgeAdded', requireSurname: false },
    { name: 'Christopher', key: 'christopherAdded', requireSurname: false }
  ];

  // Find John Ockerman's record (the one with John Ockerman and spouse Heamy/Reamy)
  // Note: Spouse name might be "Heamy" or "Reamy" and may not have surname
  const johnRecord = censusData.records.find(record => {
    const hasJohn = record.people.some(person =>
      person.givenName?.toLowerCase().includes('john') &&
      person.surname?.toLowerCase() === 'ockerman'
    );
    const hasSpouse = record.people.some(person =>
      (person.givenName?.toLowerCase().includes('reamy') ||
       person.givenName?.toLowerCase().includes('heamy'))
    );
    return hasJohn && hasSpouse;
  });

  if (!johnRecord) {
    console.warn('Could not find John Ockerman\'s record (married to Reamy/Heamy)');
    return results;
  }

  results.johnRecordId = johnRecord.id;

  // Check each required person
  requiredPeople.forEach(({ name, surname, key, requireSurname, alternateNames }) => {
    const person = johnRecord.people.find(p => {
      const givenNameLower = p.givenName?.toLowerCase() || '';

      // Check if given name matches (including alternate names)
      const nameMatches = givenNameLower.includes(name.toLowerCase()) ||
        (alternateNames && alternateNames.some(alt => givenNameLower.includes(alt.toLowerCase())));

      if (!nameMatches) return false;

      // If surname is required, check it matches
      if (requireSurname && surname) {
        const surnameLower = p.surname?.toLowerCase() || '';
        return surnameLower === surname.toLowerCase();
      }

      // If surname not required, just need name match
      return true;
    });

    if (person) {
      results[key] = true;
      results.peopleDetails[name] = {
        id: person.id,
        name: `${person.givenName} ${person.surname || ''}`.trim(),
        relationship: person.relationship
      };
    }
  });

  // Check if all people are added
  results.allPeopleAdded = requiredPeople.every(({ key }) => results[key]);
  results.correctGroup = results.allPeopleAdded;

  return results;
}

/**
 * Get a human-readable summary of validation results
 * @param {Object} validationResults - Results from validateTask
 * @returns {string} Human-readable summary
 */
export function getValidationSummary(validationResults) {
  const parts = [];

  const people = ['John', 'Reamy', 'Isaic', 'Joseph', 'George', 'Christopher'];
  people.forEach(name => {
    const key = `${name.toLowerCase()}Added`;
    const details = validationResults.peopleDetails?.[name];

    if (validationResults[key]) {
      parts.push(`✓ ${name} Ockerman added${details?.relationship ? ` as ${details.relationship}` : ''}`);
    } else {
      parts.push(`✗ ${name} Ockerman not found`);
    }
  });

  if (validationResults.allPeopleAdded) {
    parts.push('✓ All people added successfully');
  } else {
    parts.push('✗ Not all people were added');
  }

  return parts.join('\n');
}
