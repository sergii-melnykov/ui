import { useState } from "react"

import { Button } from "@/components/atoms/button/button"
import themeContract from "../../../../tokens/theme-contract.json"

type ThemeMode = "light" | "dark"

const tokenDefaults = themeContract.defaults as {
  light: Record<string, string>
  dark: Record<string, string>
}

export function DesignTokensGallery() {
  const [mode, setMode] = useState<ThemeMode>("light")
  const isDark = mode === "dark"

  return (
    <div className={isDark ? "dark min-h-screen bg-background text-foreground" : "min-h-screen bg-background text-foreground"}>
      <div className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">Design tokens</h1>
            <p className="text-muted-foreground text-sm">
              Overridable semantic variables for consuming applications
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setMode(isDark ? "light" : "dark")}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </Button>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {themeContract.overridableVariables.map((token) => {
          const value =
            mode === "light"
              ? tokenDefaults.light[token.name]
              : (tokenDefaults.dark[token.name] ?? tokenDefaults.light[token.name])
          const isRadius = token.name === "radius"

          return (
            <div
              key={token.name}
              className="rounded-lg border border-border bg-card p-3 text-card-foreground"
              data-token={token.name}
              data-theme={mode}
            >
              <div
                className="mb-2 h-14 w-full border border-border/60"
                data-token-swatch={token.name}
                data-theme={mode}
                style={
                  isRadius
                    ? { borderRadius: `var(${token.cssVariable})` }
                    : { backgroundColor: `var(${token.cssVariable})` }
                }
              />
              <p className="font-mono text-xs font-medium">{token.cssVariable}</p>
              <p className="text-muted-foreground mt-1 truncate font-mono text-[10px]">{value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
