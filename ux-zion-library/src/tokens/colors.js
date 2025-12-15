/**
 * Color Tokens
 *
 * Centralized color tokens matching Zion UI design system.
 */

export const colors = {
  // Gray scale
  gray: {
    gray00: '#FFFFFF',
    gray02: '#F6F6F6',
    gray03: '#EBECEC',
    gray05: '#DDDFDF',
    gray10: '#CACDCD',
    gray20: '#B5B8B8',
    gray30: '#9EA1A1',
    gray40: '#898C8E',
    gray50: '#76797C',
    gray60: '#64686A',
    gray70: '#545659',
    gray80: '#434547',
    gray90: '#333436',
    gray100: '#202121'
  },

  // Blue
  blue: {
    blue00: '#F1F9FC',
    blue03: '#DBF0F7',
    blue05: '#B4E8F4',
    blue10: '#84DAED',
    blue20: '#5BC5DE',
    blue30: '#39AECB',
    blue40: '#1698B8',
    blue50: '#0383A4',
    blue60: '#066F90',
    blue70: '#055C7F',
    blue80: '#00496F',
    blue90: '#00365D'
  },

  // Green
  green: {
    green02: '#F8F8EF',
    green03: '#EEEFC9',
    green05: '#E0E594',
    green10: '#C6D64E',
    green20: '#A7C41A',
    green30: '#83AF1D',
    green40: '#679A1E',
    green50: '#4E871C',
    green60: '#367419',
    green70: '#206218',
    green80: '#0F511A',
    green90: '#023D18'
  },

  // Yellow
  yellow: {
    yellow02: '#FAF8ED',
    yellow03: '#FAECB4',
    yellow05: '#FEDD73',
    yellow10: '#F9C636',
    yellow20: '#F1AB0D', // Note: yellow30 in spec appears to be duplicate
    yellow30: '#E68C03',
    yellow40: '#D87000',
    yellow50: '#C85704',
    yellow60: '#B14402',
    yellow70: '#9A3301',
    yellow80: '#812401',
    yellow90: '#621C00'
  },

  // Red
  red: {
    red02: '#FEF6F4',
    red03: '#FEE6E2',
    red05: '#FED6D6',
    red10: '#FEBBC4',
    red20: '#FD9CAE',
    red30: '#F87895',
    red40: '#EC577F',
    red50: '#D6406E',
    red60: '#C0285C',
    red70: '#A90E4B',
    red80: '#8A0A3C',
    red90: '#6B062D'
  },

  // Danger
  danger: {
    danger02: '#FEF5EE',
    danger03: '#FEE7DA',
    danger05: '#FED7C8',
    danger10: '#FEBFAA',
    danger20: '#FF9F84',
    danger30: '#FA7C61',
    danger40: '#EB5E47',
    danger50: '#DA4234',
    danger60: '#C32B26',
    danger70: '#A9191D',
    danger80: '#8A1317',
    danger90: '#6B0C11'
  },

  // Purple
  purple: {
    purple02: '#F9F4FE',
    purple03: '#F3E9FA',
    purple05: '#EAD8FB',
    purple10: '#DEC3F6',
    purple20: '#D0A8F3',
    purple30: '#BF89F1',
    purple40: '#AF6EEB',
    purple50: '#9E56DB',
    purple60: '#8C3FCC',
    purple70: '#792CB6',
    purple80: '#632296',
    purple90: '#4D1577'
  }
}

/**
 * Transparent Colors
 * Colors with specific opacity values
 */
export const transparentColors = {
  // Gray transparent colors
  transparentGray02: 'rgba(0, 0, 0, 0.035)',
  transparentGray03: 'rgba(0, 13, 13, 0.078)',
  transparentGray05: 'rgba(0, 15, 15, 0.133)',
  transparentGray10: 'rgba(0, 15, 15, 0.208)',
  transparentGray40: 'rgba(0, 6, 11, 0.463)',
  transparentGray80: 'rgba(0, 3, 5, 0.737)',

  // Blue transparent colors (for chips)
  transparentBlue03: 'rgba(0, 149, 198, 0.141)', // #0095C6 at 14.1%
  transparentBlue90: '#00365D', // #00365D at 100%

  // Green transparent colors (for chips)
  transparentGreen03: 'rgba(175, 179, 0, 0.212)', // #AFB300 at 21.2%
  transparentGreen90: 'rgba(0, 59, 22, 0.992)', // #003B16 at 99.2%

  // Yellow transparent colors (for chips)
  transparentYellow03: 'rgba(238, 190, 0, 0.294)', // #EEBE00 at 29.4%
  transparentYellow90: '#621C00', // #621C00 at 100%

  // Red transparent colors (for chips)
  transparentRed03: 'rgba(246, 35, 0, 0.114)', // #F62300 at 11.4%
  transparentRed90: '#6B062D', // #6B062D at 100%

  // Purple transparent colors (for chips)
  transparentPurple03: 'rgba(116, 0, 197, 0.086)', // #7400C5 at 8.6%
  transparentPurple90: 'rgba(77, 21, 119, 0.9)' // Keep existing as no value provided
}

/**
 * Button Colors
 * Specific colors for button high emphasis states
 */
export const buttonColors = {
  highBlue: '#066F90',
  highGreen: '#367419',
  highYellow: '#B14402',
  highRed: '#C0285C',
  highPurple: '#8C3FCC',
  highDanger: '#C32B26',
  highGray: '#202121',
  highText: '#FFFFFF',
  lightHighGray: '#F6F6F6'
}

/**
 * Chip Colors
 * Specific colors for chip selected states
 */
export const chipColors = {
  selectedBlue: '#066F90',
  selectedGreen: '#367419',
  selectedYellow: '#B14402',
  selectedRed: '#C0285C',
  selectedPurple: '#8C3FCC'
}

// Semantic color mappings for common use cases
export const semanticColors = {
  // Primary action colors
  primary: {
    default: colors.blue.blue60,
    hover: colors.blue.blue70,
    active: colors.blue.blue80,
    light: colors.blue.blue00,
    medium: colors.blue.blue03,
    text: colors.gray.gray00
  },

  // Secondary/neutral colors
  secondary: {
    default: colors.gray.gray100,
    hover: colors.gray.gray90,
    active: colors.gray.gray80,
    light: colors.gray.gray02,
    medium: colors.gray.gray03,
    text: colors.gray.gray00
  },

  // Danger/destructive colors
  danger: {
    default: colors.danger.danger60,
    hover: colors.danger.danger70,
    active: colors.danger.danger80,
    light: colors.danger.danger02,
    medium: colors.danger.danger03,
    text: colors.gray.gray00
  },

  // Success colors
  success: {
    default: colors.green.green60,
    hover: colors.green.green70,
    active: colors.green.green80,
    light: colors.green.green02,
    medium: colors.green.green03,
    text: colors.gray.gray00
  },

  // Warning colors
  warning: {
    default: colors.yellow.yellow60,
    hover: colors.yellow.yellow70,
    active: colors.yellow.yellow80,
    light: colors.yellow.yellow02,
    medium: colors.yellow.yellow03,
    text: colors.gray.gray00
  },

  // Text colors
  text: {
    primary: colors.gray.gray100,
    secondary: colors.gray.gray60,
    disabled: colors.gray.gray40,
    inverse: colors.gray.gray00
  },

  // Border colors
  border: {
    default: colors.gray.gray10,
    light: colors.gray.gray05,
    medium: colors.gray.gray30,
    dark: colors.gray.gray60
  },

  // Background colors
  background: {
    primary: colors.gray.gray00,
    secondary: colors.gray.gray02,
    tertiary: colors.gray.gray03
  }
}
