import { Theme } from "../types/theme.types"

export const lightTheme: Theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#7928ca",
    accent: "#f81ce5",
    background: "#ffffff",
    foreground: "#000000",
    muted: "#f1f1f1",
    mutedForeground: "#666666",
    border: "#e5e5e5",
    input: "#e5e5e5",
    ring: "#0070f3"
  },
  typography: {
    fontFamily: {
      sans: "Inter, system-ui, sans-serif",
      mono: "Menlo, Monaco, Consolas, monospace"
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem"
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    spacing: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem",
      40: "10rem",
      48: "12rem",
      56: "14rem",
      64: "16rem"
    }
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px"
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "none"
  }
}

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: "#0070f3",
    secondary: "#7928ca",
    accent: "#f81ce5",
    background: "#000000",
    foreground: "#ffffff",
    muted: "#1a1a1a",
    mutedForeground: "#a0a0a0",
    border: "#333333",
    input: "#333333",
    ring: "#0070f3"
  }
}
