import * as React from "react"

import generatedIndex from "./components-catalog.generated-index.json"
import {
  getStorybookIndexUrl,
  parseStoryIndex,
  type StorybookIndexFile,
  type StoryIndexSnapshot
} from "./components-catalog-story-index"

const generatedSnapshot = parseStoryIndex(generatedIndex)

export function useStorybookIndex(): {
  snapshot: StoryIndexSnapshot | null
  loading: boolean
  error: Error | null
} {
  const [snapshot, setSnapshot] = React.useState<StoryIndexSnapshot | null>(generatedSnapshot)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch(getStorybookIndexUrl())
        if (!response.ok) {
          throw new Error(`Failed to load Storybook index (${String(response.status)})`)
        }
        const data = (await response.json()) as StorybookIndexFile
        if (!cancelled) {
          setSnapshot(parseStoryIndex(data))
          setError(null)
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause : new Error(String(cause)))
          setSnapshot(generatedSnapshot)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return { snapshot, loading, error }
}
