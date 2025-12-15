import { ChevronDown } from "lucide-react";
import {
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import { Combobox } from "../ui/combobox";
import { Spinner } from "../ui/spinner";

export type MultiSelectProps = {
  value: string[];
  onValueChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
};

export function MultiSelect({
  value,
  onValueChange,
  options,
  label = "Select options",
  placeholder = "Select...",
  emptyMessage = "No options found.",
  className,
  disabled = false,
  readOnly = false,
  loading = false,
}: MultiSelectProps) {
  return (
    <Combobox
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
      multiple
      autoHighlight
      openOnFocus
      disabled={disabled || loading}
      readOnly={readOnly}
    >
      <ComboboxLabel className="mb-1">{label}</ComboboxLabel>

      <ComboboxAnchor className="h-full min-h-10 flex-wrap px-3 py-2">
        <ComboboxBadgeList>
          {value.map((item) => {
            const option = options.find((opt) => opt.value === item);
            if (!option) return null;

            return (
              <ComboboxBadgeItem key={item} value={item}>
                {option.label}
              </ComboboxBadgeItem>
            );
          })}
        </ComboboxBadgeList>
        <ComboboxInput
          placeholder={placeholder}
          className="h-auto min-w-20 flex-1"
        />
        <ComboboxTrigger className="absolute top-3 right-2">
          {!loading && <ChevronDown className="h-4 w-4" />}

          {loading && <Spinner />}
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        {options.map((opt) => (
          <ComboboxItem key={opt.value} value={opt.value}>
            {opt.label}
          </ComboboxItem>
        ))}
      </ComboboxContent>
    </Combobox>
  );
}
