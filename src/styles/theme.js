const theme = {
  colors: {
    primary: {
      main: "#0f172a",       // Deep Navy
      dark: "#020617",       // Almost Black
      light: "#1e293b",      // Lighter Navy
      hover: "#334155",      // Interactive Navy
    },
    primaryDark: "#020617",

    secondary: "#d4af37",    // Champagne Gold
    secondaryDark: "#b8860b",// Antique Brass
    secondaryLight: "#f4e4a6", // Light Champagne
    secondaryHover: "#c19b2e", // Darker Champagne

    // Additional accent colors for enhanced design
    accent: {
      coral: "#ff6b6b",      // Vibrant Coral
      teal: "#20c997",       // Fresh Teal
      lavender: "#a78bfa",   // Soft Lavender
      peach: "#ffb088",      // Warm Peach
      mint: "#6ee7b7",       // Fresh Mint
      rose: "#fda4af",       // Soft Rose
    },

    success: "#046c4e",       // Emerald Green
    successLight: "#10b981",  // Light Emerald
    error: "#b91c1c",         // Deep Carmine
    errorLight: "#ef4444",    // Light Carmine
    warning: "#f28f5f",       // Peach-Coral
    warningLight: "#fbbf24",  // Light Amber
    info: "#2563eb",          // Steel Blue
    infoLight: "#3b82f6",     // Light Blue

    // Grays (warm neutrals)
    gray: {
      50:  "#fafafa",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#292524",
      800: "#1c1917",
      900: "#0f0d0b",
    },
    gray50:  "#fafafa",
    gray100: "#f5f5f4",
    gray200: "#e7e5e4",
    gray300: "#d6d3d1",
    gray400: "#a8a29e",
    gray500: "#78716c",
    gray600: "#57534e",
    gray700: "#292524",
    gray800: "#1c1917",
    gray900: "#0f0d0b",

    // Background colors
    background:          "#fdfdfd", // Soft off-white
    backgroundSecondary: "#f9f9f9",
    backgroundTertiary: "#f5f5f4", // Warm light gray
    surface:             "#ffffff",
    surfaceHover:        "#fafafa", // Subtle hover state

    // Text colors
    text: {
      primary:   "#1c1917", // Charcoal
      secondary: "#57534e", // Muted warm gray
      tertiary:  "#a8a29e", // Soft taupe
      inverse:   "#fdfdfd",
      muted:     "#78716c", // Additional muted text
    },
    textPrimary:   "#1c1917",
    textSecondary: "#57534e",
    textTertiary:  "#a8a29e",
    textInverse:   "#fdfdfd",
    textMuted:     "#78716c",

    // Border colors
    border: {
      main:  "#e7e5e4",
      light: "#f5f5f4",
      dark:  "#d6d3d1",
      accent: "#d4af37", // Champagne border
    },
    borderLight: "#f5f5f4",

    // Shadow colors (enhanced for depth)
    shadow:     "rgba(0, 0, 0, 0.08)",
    shadowDark: "rgba(0, 0, 0, 0.16)",
    shadowColored: "rgba(212, 175, 55, 0.15)", // Champagne shadow
    shadowPrimary: "rgba(15, 23, 42, 0.1)", // Navy shadow

    // Gradient definitions
    gradients: {
      primary: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      secondary: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)",
      warm: "linear-gradient(135deg, #fdfdfd 0%, #f5f5f4 100%)",
      accent: "linear-gradient(135deg, #ff6b6b 0%, #f28f5f 100%)",
      success: "linear-gradient(135deg, #046c4e 0%, #10b981 100%)",
    },
  },

  typography: {
    fontFamily: {
      primary: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      secondary: "'Playfair Display', Georgia, 'Times New Roman', serif",
      display: "'Playfair Display', Georgia, serif",
      body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },

    sizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
    },

    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
    56: "14rem", // 224px
    64: "16rem", // 256px
    // Named spacing values
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },

  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none",
    // Enhanced shadows for the new theme
    primary: "0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)",
    secondary: "0 4px 6px -1px rgba(212, 175, 55, 0.15), 0 2px 4px -1px rgba(212, 175, 55, 0.1)",
    accent: "0 4px 6px -1px rgba(255, 107, 107, 0.15), 0 2px 4px -1px rgba(255, 107, 107, 0.1)",
  },

  transitions: {
    fast: "150ms ease-in-out",
    base: "200ms ease-in-out",
    slow: "300ms ease-in-out",
  },

  zIndex: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

export default theme;