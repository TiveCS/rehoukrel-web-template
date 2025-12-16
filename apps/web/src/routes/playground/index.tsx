import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MultiSelect } from "@/components/blocks/multi-select";
import { FileUpload } from "@/components/ui/file-upload";
import { AppFileUpload } from "@/components/blocks/AppFileUpload";

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
      <AppFileUpload />
    </div>
  );
}
