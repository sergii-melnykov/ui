/** Figma shadcn-ui component index (node 2429:383). Story links resolve from Storybook index.json when available. */

import {
  getComponentHrefFromIndex,
  type StoryIndexSnapshot
} from "./components-catalog-story-index"

export const NEW_COMPONENTS = [
  "Attachment",
  "Bubble",
  "Marker",
  "Message",
  "Message Scroller",
  "Questionnaire"
] as const

export const ALL_COMPONENTS = [
  "Accordion",
  "Alert",
  "Alert Dialog",
  "Aspect Ratio",
  "Attachment",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Bubble",
  "Button",
  "Button Group",
  "Calendar",
  "Card",
  "Carousel",
  "Chart",
  "Checkbox",
  "Collapsible",
  "Combobox",
  "Command",
  "Context Menu",
  "Data Table",
  "Date Picker",
  "Dialog",
  "Drawer",
  "Dropdown Menu",
  "Empty",
  "Field",
  "Hover Card",
  "Input",
  "Input Group",
  "Input OTP",
  "Item",
  "Kbd",
  "Marker",
  "Menubar",
  "Message",
  "Message Scroller",
  "Native Select",
  "Navigation Menu",
  "Pagination",
  "Popover",
  "Progress",
  "Questionnaire",
  "Radio Group",
  "Scroll Area",
  "Select",
  "Separator",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Slider",
  "Sonner",
  "Spinner",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Toggle",
  "Toggle Group",
  "Tooltip",
  "Box",
  "Container",
  "Dnd Input",
  "Label",
  "Page Loader",
  "Resizable",
  "Stack",
  "Toaster",
  "Typography"
] as const

/** Library-only components with no matching shadcn/ui docs page. */
export const NO_SHADCN_DOCS = new Set<string>([
  "Attachment",
  "Bubble",
  "Marker",
  "Questionnaire"
])

/** Docs paths that differ from the default slug (e.g. radix primitives). */
export const SHADCN_DOCS_HREF_OVERRIDES: Partial<Record<string, string>> = {
  Message: "https://ui.shadcn.com/docs/components/radix/message",
  "Message Scroller": "https://ui.shadcn.com/docs/components/radix/message-scroller"
}

function shadcnDocsSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")
}

export function getShadcnDocsHref(name: string): string | null {
  const override = SHADCN_DOCS_HREF_OVERRIDES[name]
  if (override) return override
  if (NO_SHADCN_DOCS.has(name)) return null
  return `https://ui.shadcn.com/docs/components/${shadcnDocsSlug(name)}`
}

export function getStorybookHref(
  name: string,
  snapshot: StoryIndexSnapshot | null
): string | null {
  return getComponentHrefFromIndex(name, snapshot)?.href ?? null
}

export function isComponentImplemented(name: string, snapshot: StoryIndexSnapshot | null): boolean {
  return getStorybookHref(name, snapshot) !== null
}

export type CatalogComponentLinks = {
  storybookHref: string | null
  shadcnHref: string | null
}

export function getCatalogComponentLinks(
  name: string,
  snapshot: StoryIndexSnapshot | null
): CatalogComponentLinks {
  return {
    storybookHref: getStorybookHref(name, snapshot),
    shadcnHref: getShadcnDocsHref(name)
  }
}

export function getCatalogLinksForStoryEntry(entry: {
  storyId: string
  catalogName: string | null
}): CatalogComponentLinks {
  return {
    storybookHref: `?path=/story/${entry.storyId}`,
    shadcnHref: entry.catalogName ? getShadcnDocsHref(entry.catalogName) : null
  }
}
