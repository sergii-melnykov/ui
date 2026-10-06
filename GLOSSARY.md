# @me1a/ui component library

Published React components aligned with shadcn/ui naming where a shadcn counterpart exists.

## Language

**Select**:
The shadcn/Radix compound dropdown (`Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, …), exported from `@me1a/ui/select`.
_Avoid_: Using “Select” for option-list form pickers; use **FormSelect** in forms or **Combobox** for searchable picking.

**Native Select**:
The shadcn HTML `<select>` wrapper (`NativeSelect`), separate from Radix **Select**.
_Avoid_: Conflating Native Select with **Select**.

**Input**:
The shadcn text field primitive.
_Avoid_: Legacy “TextField” naming; use Input with **Field** / **Label**, or **FormInput** from `@me1a/ui/rhf/input` in forms.

**Combobox**:
shadcn searchable/autocomplete picking (Base UI).
_Avoid_: Duplicating this with ad-hoc Popover + Command atoms outside RHF.

**FormCombobox**:
React Hook Form wrapper around **Combobox** (`@me1a/ui/rhf/combobox`). Use for searchable single or multi pickers in forms.
_Avoid_: Using **FormCombobox** when a fixed, non-searchable list is enough — prefer **FormSelect**.

**FormDatePicker**:
RHF wrapper for **DatePicker** (`@me1a/ui/rhf/date-picker`). Form state uses `Date` or `DateRange` (react-day-picker).

**FormInputOTP**, **FormSlider**, **FormToggle**, **FormToggleGroup**, **FormNativeSelect**:
RHF wrappers mirroring the matching atoms under `@me1a/ui/rhf/<folder>`.
