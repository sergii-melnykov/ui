import themeContract from "../../tokens/theme-contract.json"

const tokenDefaults = themeContract.defaults as {
  light: Record<string, string>
  dark: Record<string, string>
}

export function ThemingDocContent() {
  const { consumerPattern, overridableVariables, tailwindThemeBridge } = themeContract

  return (
    <div className="sb-unstyled max-w-3xl space-y-8 p-6 text-foreground">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What consuming apps may override</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Set these semantic CSS variables inside <code>@layer base</code> on{" "}
          <code>:root</code> and <code>.dark</code> in your app&apos;s{" "}
          <code>globals.css</code>. Values are OKLCH in the published library defaults.
          Dark mode uses a <code>.dark</code> class (e.g. via <code>next-themes</code>).
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-3 py-2 font-medium">Variable</th>
                <th className="px-3 py-2 font-medium">Scopes</th>
                <th className="px-3 py-2 font-medium">Light default</th>
                <th className="px-3 py-2 font-medium">Dark default</th>
              </tr>
            </thead>
            <tbody>
              {overridableVariables.map((row) => (
                <tr key={row.name} className="border-t border-border">
                  <td className="px-3 py-2 font-mono text-xs">{row.cssVariable}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.scopes.join(", ")}</td>
                  <td className="px-3 py-2 font-mono text-xs">{tokenDefaults.light[row.name] ?? "—"}</td>
                  <td className="px-3 py-2 font-mono text-xs">
                    {tokenDefaults.dark[row.name] ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Keep library-owned (do not fork in apps)</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            <code>@theme inline</code> Tailwind bridge ({tailwindThemeBridge.length} entries) —
            maps semantic vars to utilities like <code>bg-primary</code>
          </li>
          <li>Keyframes, <code>@utility</code> helpers, and component recipes in @me1a/ui</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Consumer app recipe</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            Import styles: <code>{consumerPattern.npmStyles}</code>
          </li>
          <li>
            Machine-readable contract: <code>{consumerPattern.npmContract}</code>
          </li>
          <li>{consumerPattern.overrideSurface}</li>
          <li>
            Keep in the app: {consumerPattern.keepInApp.join("; ")}
          </li>
          <li>Avoid: {consumerPattern.avoid.join("; ")}</li>
          <li>
            Prefer utilities:{" "}
            {consumerPattern.preferredUtilities.map((u) => (
              <code key={u} className="mr-1">
                {u}
              </code>
            ))}
          </li>
        </ul>
        <p className="text-muted-foreground text-sm">
          Regenerate library defaults from Figma: <code>npm run sync:tokens</code> in @me1a/ui
          (updates <code>tokens/figma-mode.json</code>, CSS, and this contract).
        </p>
      </section>
    </div>
  )
}
