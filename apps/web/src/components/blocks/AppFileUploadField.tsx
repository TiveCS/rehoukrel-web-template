import { useField } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { AppFileUpload, type AppFileUploadProps } from "./AppFileUpload";

export interface AppFileUploadFieldProps
  extends Omit<AppFileUploadProps, "value" | "onChange"> {
  field: FieldApi<any, any, any, any, File[]>;
}

/**
 * Tanstack Form wrapper for AppFileUpload
 * Automatically integrates with Tanstack Form's field state
 *
 * @example
 * <form.Field name="documents">
 *   {(field) => (
 *     <AppFileUploadField
 *       field={field}
 *       accept={AllowedFile.Pdf}
 *       maxFiles={3}
 *     />
 *   )}
 * </form.Field>
 */
export function AppFileUploadField({
  field,
  ...props
}: AppFileUploadFieldProps) {
  return (
    <AppFileUpload
      value={field.state.value}
      onChange={(files) => field.handleChange(files)}
      {...props}
    />
  );
}
