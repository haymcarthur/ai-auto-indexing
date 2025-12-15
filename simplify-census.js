import fs from 'fs';

// Read the complex census JSON
const censusData = JSON.parse(fs.readFileSync('./1950Census.json', 'utf8').replace(/^\uFEFF/, ''));

// Helper to get field value by traversing the structure
const getFieldValue = (censusData, elementId, fieldType) => {
  // Find the element
  const element = censusData.elements.find(el => el.id === elementId);
  if (!element) return null;

  // If it's a FIELD with matching fieldType, return its value
  if (element.elementType === 'FIELD' && element.fieldType === fieldType) {
    return element.fieldValues?.[0]?.origValue?.text || null;
  }

  // If it has subElements, recursively search them
  if (element.subElements && element.subElements.length > 0) {
    for (const subEl of element.subElements) {
      const value = getFieldValue(censusData, subEl.id, fieldType);
      if (value) return value;
    }
  }

  return null;
};

// Get person data
const getPerson = (personElement) => {
  const personId = personElement.id;

  // Search through all subElements for the fields we need
  const givenName = getFieldValue(censusData, personId, 'NAME_GN') || '';
  const surname = getFieldValue(censusData, personId, 'NAME_SURN') || '';
  const relationship = getFieldValue(censusData, personId, 'RELATIONSHIP_TO_HEAD') || '';
  const sex = getFieldValue(censusData, personId, 'SEX_CODE') || '';
  const age = getFieldValue(censusData, personId, 'AGE') || '';
  const race = getFieldValue(censusData, personId, 'RACE_OR_COLOR') || '';

  return {
    id: personId,
    givenName,
    surname,
    relationship,
    sex,
    age,
    race,
    attachedPersons: personElement.attachedPersons || [],
    hints: personElement.hints || []
  };
};

// Get all RECORD elements (households)
const records = censusData.elements.filter(el => el.elementType === 'RECORD');

// Create simplified structure
const simplifiedData = {
  records: records.map(record => {
    // Get all PERSON elements for this record
    const personIds = record.subElements?.map(se => se.id) || [];
    const personElements = censusData.elements.filter(el =>
      el.elementType === 'PERSON' && personIds.includes(el.id)
    );

    const people = personElements.map(getPerson);

    return {
      id: record.id,
      people
    };
  }).filter(record => record.people.length > 0)
};

// Write simplified JSON
fs.writeFileSync('./1950Census-simple.json', JSON.stringify(simplifiedData, null, 2));

console.log('Simplified census data written to 1950Census-simple.json');
console.log(`Found ${simplifiedData.records.length} household records`);
console.log(`Total people: ${simplifiedData.records.reduce((sum, r) => sum + r.people.length, 0)}`);
