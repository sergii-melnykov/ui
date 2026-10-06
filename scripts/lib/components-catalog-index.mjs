/** Mirrors components-catalog-story-index.ts for Node scripts (keep in sync). */

const LAYER_PREFIXES = ["Atoms", "Molecules", "Organisms", "Form"]

export function storyTitleSegmentToLabel(segment) {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim()
}

export function pickPreferredStoryId(stories) {
  const playable = stories.filter((entry) => entry.type === "story" && entry.id)
  if (playable.length === 0) return null

  const overrideOrder = [
    (entry) => entry.id.endsWith("--design-spec"),
    (entry) => entry.id.endsWith("--default"),
    () => true
  ]

  for (const matches of overrideOrder) {
    const found = playable.find(matches)
    if (found) return found.id
  }

  return playable[0]?.id ?? null
}

export function buildStoriesByTitle(entries) {
  const map = new Map()

  for (const entry of Object.values(entries)) {
    if (entry.type !== "story" || !entry.title) continue
    const list = map.get(entry.title) ?? []
    list.push(entry)
    map.set(entry.title, list)
  }

  return map
}

export function buildAutoCatalogGroups(storiesByTitle) {
  const rows = []

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
    const layerOrder = LAYER_PREFIXES.indexOf(a.layer)
    const layerOrderB = LAYER_PREFIXES.indexOf(b.layer)
    const layerA = layerOrder === -1 ? 99 : layerOrder
    const layerB = layerOrderB === -1 ? 99 : layerOrderB
    if (layerA !== layerB) return layerA - layerB
    return a.label.localeCompare(b.label)
  })

  return rows
}

export function parseStoryIndex(data) {
  const storiesByTitle = buildStoriesByTitle(data.entries)
  const groups = buildAutoCatalogGroups(storiesByTitle)
  return { storiesByTitle, groups }
}
