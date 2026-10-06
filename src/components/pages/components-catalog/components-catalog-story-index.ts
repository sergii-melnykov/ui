/** Storybook index.json (v5) helpers — Storybook-only, not exported from the package. */

export type StorybookIndexFile = {
  v: number
  entries: Record<string, StorybookIndexEntry>
}

export type StorybookIndexEntry = {
  id: string
  title?: string
  name?: string
  type?: string
  importPath?: string
}

const LAYER_PREFIXES = ["Atoms", "Molecules", "Organisms", "Form"] as const

/** Catalog display names that do not match CSF title segments (PascalCase). */
export const CATALOG_NAME_TO_STORY_TITLE: Partial<
  Record<string, `${(typeof LAYER_PREFIXES)[number]}/${string}`>
> = {
  Sonner: "Atoms/Toast",
  "Date Picker": "Atoms/Date Picker",
  "Message Scroller": "Atoms/Message Scroller"
}

/** Optional per-catalog-name story id when auto-pick is wrong (e.g. multiple design-spec variants). */
export const CATALOG_STORY_ID_OVERRIDES: Partial<Record<string, string>> = {
  Chart: "atoms-chart--design-spec"
}

export function getStorybookIndexUrl(): string {
  if (typeof window === "undefined") return "/index.json"
  const base = window.location.pathname.replace(/\/iframe\.html.*$/, "") || ""
  return `${base}/index.json`.replace(/\/{2,}/g, "/")
}

export function catalogNameToTitleSegment(name: string): string {
  return name.replace(/\s+/g, "")
}

export function resolveStoryTitle(
  catalogName: string,
  storiesByTitle: ReadonlyMap<string, StorybookIndexEntry[]>
): string | null {
  const alias = CATALOG_NAME_TO_STORY_TITLE[catalogName]
  if (alias && storiesByTitle.has(alias)) return alias

  const segment = catalogNameToTitleSegment(catalogName)
  for (const prefix of LAYER_PREFIXES) {
    for (const title of [`${prefix}/${catalogName}`, `${prefix}/${segment}`]) {
      if (storiesByTitle.has(title)) return title
    }
  }
  return null
}

export type CatalogCardEntry = {
  layer: string
  title: string
  label: string
  storyId: string
  catalogName: string | null
}

export function buildTitleToCatalogNameMap(
  snapshot: StoryIndexSnapshot,
  catalogNames: readonly string[]
): Map<string, string> {
  const map = new Map<string, string>()
  for (const name of catalogNames) {
    const title = resolveStoryTitle(name, snapshot.storiesByTitle)
    if (title) map.set(title, name)
  }
  return map
}

export function buildCatalogCardEntries(
  snapshot: StoryIndexSnapshot,
  catalogNames: readonly string[]
): CatalogCardEntry[] {
  const titleToCatalog = buildTitleToCatalogNameMap(snapshot, catalogNames)
  return snapshot.groups.map((row) => ({
    ...row,
    catalogName: titleToCatalog.get(row.title) ?? null
  }))
}

export function pickPreferredStoryId(stories: readonly StorybookIndexEntry[]): string | null {
  const playable = stories.filter((entry) => entry.type === "story" && entry.id)
  if (playable.length === 0) return null

  const overrideOrder = [
    (entry: StorybookIndexEntry) => entry.id.endsWith("--design-spec"),
    (entry: StorybookIndexEntry) => entry.id.endsWith("--default"),
    () => true
  ]

  for (const matches of overrideOrder) {
    const found = playable.find(matches)
    if (found) return found.id
  }

  return playable[0]?.id ?? null
}

export function buildStoriesByTitle(
  entries: Record<string, StorybookIndexEntry>
): Map<string, StorybookIndexEntry[]> {
  const map = new Map<string, StorybookIndexEntry[]>()

  for (const entry of Object.values(entries)) {
    if (entry.type !== "story" || !entry.title) continue
    const list = map.get(entry.title) ?? []
    list.push(entry)
    map.set(entry.title, list)
  }

  return map
}

export function buildAutoCatalogGroups(
  storiesByTitle: ReadonlyMap<string, StorybookIndexEntry[]>
): { layer: string; title: string; label: string; storyId: string }[] {
  const rows: { layer: string; title: string; label: string; storyId: string }[] = []

  for (const [title, stories] of storiesByTitle) {
    if (title.startsWith("Pages/")) continue

    const storyId = pickPreferredStoryId(stories)
    if (!storyId) continue

    const [layer = "Other", segment = title] = title.split("/")
    rows.push({
      layer,
      title,
      label: storyTitleSegmentToLabel(segment),
      storyId
    })
  }

  rows.sort((a, b) => {
    const layerOrder = LAYER_PREFIXES.indexOf(a.layer as (typeof LAYER_PREFIXES)[number])
    const layerOrderB = LAYER_PREFIXES.indexOf(b.layer as (typeof LAYER_PREFIXES)[number])
    const layerA = layerOrder === -1 ? 99 : layerOrder
    const layerB = layerOrderB === -1 ? 99 : layerOrderB
    if (layerA !== layerB) return layerA - layerB
    return a.label.localeCompare(b.label)
  })

  return rows
}

export function storyTitleSegmentToLabel(segment: string): string {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim()
}

export type StoryIndexSnapshot = {
  storiesByTitle: Map<string, StorybookIndexEntry[]>
  groups: ReturnType<typeof buildAutoCatalogGroups>
}

export function parseStoryIndex(data: StorybookIndexFile): StoryIndexSnapshot {
  const storiesByTitle = buildStoriesByTitle(data.entries)
  const groups = buildAutoCatalogGroups(storiesByTitle)
  return { storiesByTitle, groups }
}

export function getComponentHrefFromIndex(
  catalogName: string,
  snapshot: StoryIndexSnapshot | null
): { href: string; external: boolean } | null {
  if (!snapshot) return null

  const overrideId = CATALOG_STORY_ID_OVERRIDES[catalogName]
  if (overrideId) {
    return { href: `?path=/story/${overrideId}`, external: false }
  }

  const storyTitle = resolveStoryTitle(catalogName, snapshot.storiesByTitle)
  if (!storyTitle) return null

  const stories = snapshot.storiesByTitle.get(storyTitle)
  if (!stories) return null

  const storyId = pickPreferredStoryId(stories)
  if (!storyId) return null

  return { href: `?path=/story/${storyId}`, external: false }
}
