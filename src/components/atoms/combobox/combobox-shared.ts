export const FRAMEWORKS = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const

export type FrameworkGroup = {
  label: string
  items: readonly string[]
}

export const FRAMEWORK_GROUPS: FrameworkGroup[] = [
  { label: "React-based", items: ["Next.js", "Remix"] },
  { label: "Vue-based", items: ["Nuxt.js"] },
  { label: "Other", items: ["SvelteKit", "Astro"] }
]
