export { FormProvider as FormProviderController } from "react-hook-form";
export * from "react-hook-form";

// COMPONENTS
export * from "./rhf-select";
export * from "./rhf-checkbox";

export { default as RHFSwitch } from "./rhf-switch";
export { default as RHFSlider } from "./rhf-slider";
export { default as RHFTextField } from "./rhf-text-field";
export { default as RHFRadioGroup } from "./rhf-radio-group";
// export { default as RHFAutocomplete } from './rhf-autocomplete';

export { default as FormProvider } from "./form-provider";

// RESOLVER & SCHEMA
export { yupResolver } from "@hookform/resolvers/yup";
export * as Yup from "yup";
