import { describe, expect, it } from "vitest"

import { getCatalogComponentLinks } from "./components-catalog-data"
import {
  buildStoriesByTitle,
  getComponentHrefFromIndex,
  parseStoryIndex,
  pickPreferredStoryId,
  resolveStoryTitle
} from "./components-catalog-story-index"

describe("components-catalog-story-index", () => {
  it("prefers design-spec then default", () => {
    const id = pickPreferredStoryId([
      { id: "atoms-button--default", type: "story", title: "Atoms/Button" },
      { id: "atoms-button--design-spec", type: "story", title: "Atoms/Button" }
    ])
    expect(id).toBe("atoms-button--design-spec")
  })

  it("resolves catalog names to story titles", () => {
    const storiesByTitle = buildStoriesByTitle({
      a: { id: "atoms-alert-dialog--default", type: "story", title: "Atoms/AlertDialog" },
      b: { id: "atoms-date-picker--default", type: "story", title: "Atoms/Date Picker" }
    })
    expect(resolveStoryTitle("Alert Dialog", storiesByTitle)).toBe("Atoms/AlertDialog")
    expect(resolveStoryTitle("Date Picker", storiesByTitle)).toBe("Atoms/Date Picker")
  })

  it("builds href from index snapshot", () => {
    const snapshot = parseStoryIndex({
      v: 5,
      entries: {
        x: { id: "atoms-badge--design-spec", type: "story", title: "Atoms/Badge" }
      }
    })
    expect(getComponentHrefFromIndex("Badge", snapshot)).toEqual({
      href: "?path=/story/atoms-badge--design-spec",
      external: false
    })
  })

  it("exposes storybook and shadcn links separately", () => {
    const snapshot = parseStoryIndex({
      v: 5,
      entries: {
        x: { id: "atoms-badge--design-spec", type: "story", title: "Atoms/Badge" }
      }
    })
    expect(getCatalogComponentLinks("Badge", snapshot)).toEqual({
      storybookHref: "?path=/story/atoms-badge--design-spec",
      shadcnHref: "https://ui.shadcn.com/docs/components/badge"
    })
    expect(getCatalogComponentLinks("Message", snapshot).shadcnHref).toBe(
      "https://ui.shadcn.com/docs/components/radix/message"
    )
  })
})
