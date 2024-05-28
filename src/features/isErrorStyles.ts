import type { TFormInputs, TFormInputsNames } from "@/types/TFormInputs";
import { FieldErrors } from "react-hook-form";



export const isErrorStyles = (
  fieldName: TFormInputsNames,
  errors: FieldErrors<TFormInputs>,
  styles: CSSModuleClasses
  ) => {
  return !errors[fieldName] ? styles.input : `${styles.input} ${styles.error}`;
}