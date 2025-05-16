export type ThemeMode = "light" | "dark" | "system"

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  border: string
  input: string
  ring: string
}

export interface ThemeTypography {
  fontFamily: {
    sans: string
    mono: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    "2xl": string
    "3xl": string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
}

export interface ThemeSpacing {
  spacing: {
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    8: string
    10: string
    12: string
    16: string
    20: string
    24: string
    32: string
    40: string
    48: string
    56: string
    64: string
  }
}

export interface Theme {
  colors: ThemeColors
  typography: ThemeTypography
  spacing: ThemeSpacing
  borderRadius: {
    none: string
    sm: string
    DEFAULT: string
    md: string
    lg: string
    xl: string
    full: string
  }
  shadows: {
    sm: string
    DEFAULT: string
    md: string
    lg: string
    xl: string
    "2xl": string
    inner: string
    none: string
  }
}

export interface ThemeContextType {
  theme: Theme
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}
