/**
 * Typography Tokens
 *
 * Centralized typography tokens matching Zion UI design system.
 * Use these for consistent text styling across all components.
 */

// Font families
export const fontFamilies = {
  notoSans: '"Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  museoSlab: '"Museo Slab GWebM", Georgia, serif'
}

// Font weights
export const fontWeights = {
  regular: 400,
  semiBold: 600,
  medium: 500
}

/**
 * Body (Heading Base)
 * Noto Sans Regular, 130% line height
 */
export const body = {
  a: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '12px',
    lineHeight: '130%'
  },
  b: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '16px',
    lineHeight: '130%'
  },
  c: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '21px',
    lineHeight: '130%'
  },
  d: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '27px',
    lineHeight: '130%'
  },
  e: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '35px',
    lineHeight: '130%'
  }
}

/**
 * Bold (Bold Heading Base)
 * Noto Sans SemiBold, 120% line height
 */
export const bold = {
  b: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.semiBold,
    fontSize: '16px',
    lineHeight: '120%'
  },
  c: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.semiBold,
    fontSize: '21px',
    lineHeight: '120%'
  },
  d: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.semiBold,
    fontSize: '27px',
    lineHeight: '120%'
  },
  e: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.semiBold,
    fontSize: '35px',
    lineHeight: '120%'
  },
  f: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.semiBold,
    fontSize: '46px',
    lineHeight: '120%'
  },
  g: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.semiBold,
    fontSize: '60px',
    lineHeight: '120%'
  },
  h: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.semiBold,
    fontSize: '77px',
    lineHeight: '120%'
  }
}

/**
 * Display (Display Heading Base)
 * Museo Slab GWebM 500, 108% line height
 */
export const display = {
  f: {
    fontFamily: fontFamilies.museoSlab,
    fontWeight: fontWeights.medium,
    fontSize: '46px',
    lineHeight: '108%'
  },
  g: {
    fontFamily: fontFamilies.museoSlab,
    fontWeight: fontWeights.medium,
    fontSize: '60px',
    lineHeight: '108%'
  },
  h: {
    fontFamily: fontFamilies.museoSlab,
    fontWeight: fontWeights.medium,
    fontSize: '77px',
    lineHeight: '108%'
  }
}

/**
 * Paragraph
 * Noto Sans Regular, 150% line height (not dense)
 */
export const paragraph = {
  xs: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '12px',
    lineHeight: '150%'
  },
  sm: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '16px',
    lineHeight: '150%'
  },
  md: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '21px',
    lineHeight: '150%'
  },
  lg: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '27px',
    lineHeight: '150%'
  },
  xl: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '35px',
    lineHeight: '150%'
  }
}

/**
 * Paragraph Dense
 * Noto Sans Regular, 130% line height
 */
export const paragraphDense = {
  xs: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '12px',
    lineHeight: '130%'
  },
  sm: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '16px',
    lineHeight: '130%'
  },
  md: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '21px',
    lineHeight: '130%'
  },
  lg: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '27px',
    lineHeight: '130%'
  },
  xl: {
    fontFamily: fontFamilies.notoSans,
    fontWeight: fontWeights.regular,
    fontSize: '35px',
    lineHeight: '130%'
  }
}

/**
 * Uppercase (Button Typography)
 * Noto Sans Regular, 130% line height, all caps
 */
export const uppercase = {
  fontFamily: fontFamilies.notoSans,
  fontWeight: fontWeights.regular,
  fontSize: '16px',
  lineHeight: '130%',
  textTransform: 'uppercase',
  letterSpacing: 0
}

/**
 * Text (Link/Action Typography)
 * Noto Sans Regular, 16px, 130% line height, underline
 */
export const text = {
  fontFamily: fontFamilies.notoSans,
  fontWeight: fontWeights.regular,
  fontSize: '16px',
  lineHeight: '130%',
  textDecoration: 'underline'
}

/**
 * Heading Blocks Configuration
 * Each heading level has specific typography for display, supplemental, overline, and subheading
 */
export const headingBlocks = {
  h1: {
    display: {
      fontFamily: fontFamilies.museoSlab,
      fontWeight: fontWeights.medium,
      fontSize: '77px',
      lineHeight: '108%'
    },
    supplemental: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.semiBold,
      fontSize: '60px',
      lineHeight: '120%'
    },
    overline: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '27px',
      lineHeight: '130%'
    },
    subheading: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '35px',
      lineHeight: '130%'
    }
  },
  h2: {
    display: {
      fontFamily: fontFamilies.museoSlab,
      fontWeight: fontWeights.medium,
      fontSize: '60px',
      lineHeight: '108%'
    },
    supplemental: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.semiBold,
      fontSize: '46px',
      lineHeight: '120%'
    },
    overline: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '21px',
      lineHeight: '130%'
    },
    subheading: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '27px',
      lineHeight: '130%'
    }
  },
  h3: {
    display: {
      fontFamily: fontFamilies.museoSlab,
      fontWeight: fontWeights.medium,
      fontSize: '46px',
      lineHeight: '108%'
    },
    supplemental: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.semiBold,
      fontSize: '35px',
      lineHeight: '120%'
    },
    overline: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '16px',
      lineHeight: '130%'
    },
    subheading: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '21px',
      lineHeight: '130%'
    }
  },
  h4: {
    display: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.semiBold,
      fontSize: '27px',
      lineHeight: '120%'
    },
    supplemental: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '27px',
      lineHeight: '130%'
    },
    overline: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '16px',
      lineHeight: '130%'
    },
    subheading: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '16px',
      lineHeight: '130%'
    }
  },
  h5: {
    display: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.semiBold,
      fontSize: '21px',
      lineHeight: '120%'
    },
    supplemental: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '21px',
      lineHeight: '130%'
    },
    overline: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '12px',
      lineHeight: '130%'
    },
    subheading: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '16px',
      lineHeight: '130%'
    }
  },
  h6: {
    display: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.semiBold,
      fontSize: '16px',
      lineHeight: '120%'
    },
    supplemental: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '16px',
      lineHeight: '130%'
    },
    overline: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '12px',
      lineHeight: '130%'
    },
    subheading: {
      fontFamily: fontFamilies.notoSans,
      fontWeight: fontWeights.regular,
      fontSize: '12px',
      lineHeight: '130%'
    }
  }
}
