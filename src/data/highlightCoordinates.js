/**
 * Highlight Coordinates for Census Document
 * Maps person IDs to pixel coordinates for highlight overlay
 *
 * CALIBRATION: 2026-02-10 - Manually calibrated using calibration mode
 * - Calibrated dimensions: 2000x2618px
 * - Actual image dimensions: 4032x2624px
 * - Coordinates are automatically scaled in getAllHighlights() to match actual image
 */

export const highlightCoordinates = {
  // JOHN OCKERMAN - Single record (under "1849" heading)
  "1:1:X7YY-L4QH": {
    id: "1:1:X7YY-L4QH",
    x: 287,
    y: 630,
    width: 164,
    height: 36,
    selectable: true
  },

  // JOHN OOKERMAN HOUSEHOLD - First household under "1850" heading
  // John Ookerman (Primary - age 31)
  "1:1:X7YY-L4QZ": {
    id: "1:1:X7YY-L4QZ",
    x: 299,
    y: 881,
    width: 160,
    height: 31,
    selectable: true
  },

  // Reamy (Spouse - age 24)
  "1:1:X7YY-NPRG": {
    id: "1:1:X7YY-NPRG",
    x: 449,
    y: 931,
    width: 64,
    height: 30,
    selectable: true
  },

  // Joseph (Child - age 6)
  "1:1:X7YY-2TSX": {
    id: "1:1:X7YY-2TSX",
    x: 450,
    y: 1031,
    width: 80,
    height: 35,
    selectable: true
  },

  // George (Child - age 6)
  "1:1:X7YY-NPRB": {
    id: "1:1:X7YY-NPRB",
    x: 450,
    y: 1082,
    width: 80,
    height: 39,
    selectable: true
  },

  // Christopher (Sibling - age 4)
  "1:1:X7YY-2TSF": {
    id: "1:1:X7YY-2TSF",
    x: 451,
    y: 1131,
    width: 127,
    height: 39,
    selectable: true
  },

  // Isaic (Child - age 10)
  "1:1:X7YY-2TS6": {
    id: "1:1:X7YY-2TS6",
    x: 450,
    y: 980,
    width: 70,
    height: 34,
    selectable: true
  },

  // JOHN D OCKERMAN HOUSEHOLD - Second household under "1850"
  // George Ockerman (Primary - age 34)
  "1:1:X7YY-B92S": {
    id: "1:1:X7YY-B92S",
    x: 303,
    y: 1254,
    width: 174,
    height: 40,
    selectable: true
  },

  // Kitty (Child - age 41)
  "1:1:X7YY-B923": {
    id: "1:1:X7YY-B923",
    x: 406,
    y: 1307,
    width: 68,
    height: 40,
    selectable: true
  },

  // Luella (Child - age 12)
  "1:1:X7YY-TD5K": {
    id: "1:1:X7YY-TD5K",
    x: 411,
    y: 1362,
    width: 75,
    height: 33,
    selectable: true
  },

  // Thompson Ockerman (Child - age 10)
  "1:1:X7YY-B92Z": {
    id: "1:1:X7YY-B92Z",
    x: 398,
    y: 1417,
    width: 99,
    height: 27,
    selectable: true
  },

  // Ida Susan (Sibling - age 9)
  "1:1:X7YY-YYWX": {
    id: "1:1:X7YY-YYWX",
    x: 389,
    y: 1465,
    width: 108,
    height: 35,
    selectable: true
  },

  // Emmorin (Sibling - no age listed)
  "1:1:X7YY-R2JY": {
    id: "1:1:X7YY-R2JY",
    x: 387,
    y: 1514,
    width: 89,
    height: 37,
    selectable: true
  },

  // John (Child - age 1)
  "1:1:X7YY-TD5L": {
    id: "1:1:X7YY-TD5L",
    x: 389,
    y: 1571,
    width: 58,
    height: 33,
    selectable: true
  },

  // JOHN D OCKERMAN HOUSEHOLD continued
  // John D Ockerman (Grand Parent - age 60) - First mention
  "1:1:X7YY-B92N": {
    id: "1:1:X7YY-B92N",
    x: 298,
    y: 1689,
    width: 151,
    height: 42,
    selectable: true
  },

  // John D Ockerman - Second mention (later in document)
  "1:1:X7YY-B92N-2": {
    id: "1:1:X7YY-B92N",
    x: 300,
    y: 2175,
    width: 176,
    height: 44,
    selectable: true
  },

  // Julia (Sibling - age 19)
  "1:1:X7YY-B92J": {
    id: "1:1:X7YY-B92J",
    x: 342,
    y: 1747,
    width: 69,
    height: 37,
    selectable: true
  },

  // Marion (Sibling-in-law - age 19)
  "1:1:X7YY-YYWV": {
    id: "1:1:X7YY-YYWV",
    x: 333,
    y: 1797,
    width: 75,
    height: 34,
    selectable: true
  },

  // Absolom (Child - age 26)
  "1:1:X7YY-R2VS": {
    id: "1:1:X7YY-R2VS",
    x: 321,
    y: 1849,
    width: 85,
    height: 37,
    selectable: true
  },

  // John (Aunt or Uncle - age 28)
  "1:1:X7YY-B92V": {
    id: "1:1:X7YY-B92V",
    x: 324,
    y: 1898,
    width: 53,
    height: 37,
    selectable: true
  },

  // Maggie (Sibling-in-law - age 24)
  "1:1:X7YY-TD5R": {
    id: "1:1:X7YY-TD5R",
    x: 403,
    y: 1953,
    width: 72,
    height: 35,
    selectable: true
  },

  // Mollie (Aunt or Uncle - age 1)
  "1:1:X7YY-R2V3": {
    id: "1:1:X7YY-R2V3",
    x: 388,
    y: 2004,
    width: 77,
    height: 36,
    selectable: true
  },

  // Charles Guthrea (Sibling-in-law - no age) - First mention
  "1:1:X7YY-TD5Y": {
    id: "1:1:X7YY-TD5Y",
    x: 752,
    y: 2064,
    width: 166,
    height: 38,
    selectable: true
  },

  // Charles Guthrea - Second mention
  "1:1:X7YY-TD5Y-2": {
    id: "1:1:X7YY-TD5Y",
    x: 527,
    y: 2235,
    width: 179,
    height: 48,
    selectable: true
  }
};

/**
 * Returns all highlights with their person data from census records
 * @param {Object} censusData - The census data object containing records
 * @returns {Array} Array of highlight objects with coordinates and person data
 */
export const getAllHighlights = (censusData) => {
  const highlights = [];

  // Calibrated image dimensions vs actual image dimensions
  const CALIBRATED_WIDTH = 2000;
  const CALIBRATED_HEIGHT = 2618;
  const ACTUAL_WIDTH = 4032;
  const ACTUAL_HEIGHT = 2624;

  // Calculate scale factors
  const scaleX = ACTUAL_WIDTH / CALIBRATED_WIDTH;  // 4032 / 2000 = 2.016
  const scaleY = ACTUAL_HEIGHT / CALIBRATED_HEIGHT; // 2624 / 2618 = 1.0023

  // Flatten all people from all records
  const allPeople = censusData.records.flatMap(record =>
    record.people.map(person => ({
      ...person,
      recordId: record.id,
      recordDate: record.date,
      recordPlace: record.place
    }))
  );

  // Map coordinates to people
  Object.keys(highlightCoordinates).forEach(personId => {
    const coords = highlightCoordinates[personId];

    // Handle multiple highlights for same person (with -2, -3 suffixes)
    const basePersonId = personId.replace(/-\d+$/, '');
    const person = allPeople.find(p => p.id === basePersonId || p.id === coords.id);

    if (person) {
      highlights.push({
        ...coords,
        // Scale coordinates to match actual image size
        x: Math.round(coords.x * scaleX),
        y: Math.round(coords.y * scaleY),
        width: Math.round(coords.width * scaleX),
        height: Math.round(coords.height * scaleY),
        personData: person,
        selectable: true
      });
    } else {
      console.warn(`No person found for highlight ID: ${personId}`);
    }
  });

  return highlights;
};

/**
 * Returns coordinates for a specific person
 * @param {string} personId - The person ID to get coordinates for
 * @returns {Object|null} Coordinate object or null if not found
 */
export const getHighlightForPerson = (personId) => {
  return highlightCoordinates[personId] || null;
};

/**
 * Validates that all coordinates are within image bounds
 * @param {number} imageWidth - Width of the census image
 * @param {number} imageHeight - Height of the census image
 * @returns {Array} Array of validation warnings
 */
export const validateCoordinates = (imageWidth = 2000, imageHeight = 2618) => {
  const warnings = [];

  Object.entries(highlightCoordinates).forEach(([id, coords]) => {
    if (coords.x < 0 || coords.y < 0) {
      warnings.push(`${id}: Negative coordinates (x: ${coords.x}, y: ${coords.y})`);
    }
    if (coords.x + coords.width > imageWidth) {
      warnings.push(`${id}: Exceeds image width (x: ${coords.x}, width: ${coords.width})`);
    }
    if (coords.y + coords.height > imageHeight) {
      warnings.push(`${id}: Exceeds image height (y: ${coords.y}, height: ${coords.height})`);
    }
  });

  return warnings;
};
