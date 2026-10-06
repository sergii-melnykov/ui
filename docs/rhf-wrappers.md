# RHF field wrappers

Conventions for `src/components/rhf/` (`Form*` exports).

## Checklist for a new wrapper

1. **Folder** mirrors the atom: `rhf/date-picker/` → `FormDatePicker`, exported from `@me1a/ui/rhf/date-picker`.
2. **Shell**: `useFormContext` + `FormField` + `FormItem` / `FormLabel` / `FormControl` / `FormMessage` (see `rhf/input/input.tsx`).
3. **Controlled wiring**: map atom events explicitly (`onCheckedChange`, `onValueChange`, calendar `onSelect`) — do not spread `{...field}` onto non-native controls.
4. **Form config**: consumers should use `mode: "onSubmit"` and Zod 4 + `@hookform/resolvers/zod`.
5. **Storybook**: `title: "Form/<Name>"`, decorator with `FormProvider`, schema, submit button.
6. **Barrel**: add `export * from "./<folder>"` in `src/components/rhf/index.ts`; build entries pick up the folder automatically.
7. **Picking**: fixed option list → `FormSelect`; searchable → `FormCombobox` (see `GLOSSARY.md`).

## Server errors

Use `setError("root.serverError", { message: "…" })` and render `<FormRootError />` inside the same `Form` provider.
