---
status: accepted
---

# shadcn `Select` owns the `@me1a/ui/select` export

The `@me1a/ui/select` entry matches shadcn/ui: Radix compound components (`Select`, `SelectTrigger`, `SelectContent`, …). Former option-based pickers (`options` + `onChange`, Popover + Command) were removed as public atoms; that behavior lives only inside **FormSelect** and **FormMultiSelect** as internal controls. Deprecated **TextField** was removed; use **Input** + **Field** or **FormInput**.
