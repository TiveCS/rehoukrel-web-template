import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MultiSelect } from "@/components/blocks/multi-select";

export const Route = createFileRoute("/playground/")({
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const [value, setValue] = useState<string[]>([]);
  const tricks = [
    { value: "backflip", label: "Backflip" },
    { value: "frontflip", label: "Frontflip" },
    { value: "sideflip", label: "Sideflip" },
    { value: "360", label: "360" },
    { value: "720", label: "720" },
  ];

  return (
    <div className="p-8">
      <MultiSelect
        label="Tricks"
        value={value}
        onValueChange={setValue}
        options={tricks}
        placeholder="Select tricks..."
        emptyMessage="No tricks found."
      />
    </div>
  );
}
