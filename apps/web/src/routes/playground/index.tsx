import { AppFileUpload } from "@/components/blocks/app-file-upload";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground/")({
  component: PlaygroundPage,
});

function PlaygroundPage() {
  return (
    <div className="p-8">
      <AppFileUpload />
    </div>
  );
}
