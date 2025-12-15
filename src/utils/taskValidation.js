/**
 * Validate that the task was completed correctly
 * Task: Add Gary Fadden and Ronald Fadden to Edgar Fadden's household
 *
 * @param {Object} censusData - The census data object
 * @returns {Object} Validation results
 */
export function validateTask(censusData) {
  const results = {
    garyAdded: false,
    ronaldAdded: false,
    correctGroup: false,
    correctRelationships: false,
    edgarRecordId: null,
    garyDetails: null,
    ronaldDetails: null
  };

  // Find Edgar Fadden's record
  const edgarRecord = censusData.records.find(record => {
    return record.people.some(person =>
      person.givenName?.includes('Edgar') &&
      person.surname?.toLowerCase() === 'fadden'
    );
  });

  if (!edgarRecord) {
    console.warn('Could not find Edgar Fadden\'s record');
    return results;
  }

  results.edgarRecordId = edgarRecord.id;

  // Check if Gary Fadden is in Edgar's household
  const gary = edgarRecord.people.find(person =>
    person.givenName?.toLowerCase().includes('gary') &&
    person.surname?.toLowerCase() === 'fadden'
  );

  if (gary) {
    results.garyAdded = true;
    results.garyDetails = {
      id: gary.id,
      name: `${gary.givenName} ${gary.surname}`,
      relationship: gary.relationship
    };
  }

  // Check if Ronald Fadden is in Edgar's household
  const ronald = edgarRecord.people.find(person =>
    person.givenName?.toLowerCase().includes('ronald') &&
    person.surname?.toLowerCase() === 'fadden'
  );

  if (ronald) {
    results.ronaldAdded = true;
    results.ronaldDetails = {
      id: ronald.id,
      name: `${ronald.givenName} ${ronald.surname}`,
      relationship: ronald.relationship
    };
  }

  // Check if both are in the correct group
  results.correctGroup = results.garyAdded && results.ronaldAdded;

  // Validate relationships (should be appropriate family relationships)
  // For this census, typical relationships are: Head, Wife, Son, Daughter, etc.
  const validRelationships = [
    'Head', 'Wife', 'Husband', 'Son', 'Daughter',
    'Father', 'Mother', 'Brother', 'Sister',
    'Grandson', 'Granddaughter', 'Nephew', 'Niece',
    'Uncle', 'Aunt', 'Cousin', 'Boarder', 'Lodger'
  ];

  const garyHasValidRelationship = gary && validRelationships.includes(gary.relationship);
  const ronaldHasValidRelationship = ronald && validRelationships.includes(ronald.relationship);

  results.correctRelationships = (
    (!gary || garyHasValidRelationship) &&
    (!ronald || ronaldHasValidRelationship)
  );

  // Log results for debugging
  console.log('Task validation results:', results);

  return results;
}

/**
 * Get a human-readable summary of validation results
 * @param {Object} validationResults - Results from validateTask
 * @returns {string} Human-readable summary
 */
export function getValidationSummary(validationResults) {
  const parts = [];

  if (validationResults.garyAdded) {
    parts.push(`✓ Gary Fadden added as ${validationResults.garyDetails.relationship}`);
  } else {
    parts.push('✗ Gary Fadden not found in Edgar\'s household');
  }

  if (validationResults.ronaldAdded) {
    parts.push(`✓ Ronald Fadden added as ${validationResults.ronaldDetails.relationship}`);
  } else {
    parts.push('✗ Ronald Fadden not found in Edgar\'s household');
  }

  if (validationResults.correctRelationships) {
    parts.push('✓ Relationships are valid');
  } else {
    parts.push('✗ Invalid relationships detected');
  }

  return parts.join('\n');
}
