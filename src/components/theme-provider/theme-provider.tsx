import React, { createContext, useContext, useEffect, useState } from "react"
import { ThemeContextType, ThemeMode } from "../../types/theme.types"
import { darkTheme, lightTheme } from "../../config/theme.config"

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultMode?: ThemeMode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = "system"
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode)
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (mode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      setTheme(systemTheme === "dark" ? darkTheme : lightTheme)
    } else {
      root.classList.add(mode)
      setTheme(mode === "dark" ? darkTheme : lightTheme)
    }
  }, [mode])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (mode === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light"
        setTheme(systemTheme === "dark" ? darkTheme : lightTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [mode])

  const value = {
    theme,
    mode,
    setMode
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
