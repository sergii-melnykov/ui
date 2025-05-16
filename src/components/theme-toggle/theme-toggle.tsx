import React from "react"
import { useTheme } from "../theme-provider/theme-provider"
import { ThemeMode } from "../../types/theme.types"

export const ThemeToggle: React.FC = () => {
  const { mode, setMode } = useTheme()

  const toggleTheme = () => {
    const newMode: ThemeMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
      aria-label={`Switch to ${mode === "light" ? "dark" : "light"} theme`}
    >
      {mode === "light" ? "🌙" : "☀️"}
    </button>
  )
}
