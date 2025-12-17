import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "../ui/file-upload";
import React from "react";
import { toast } from "sonner";

export interface AppFileUploadProps {
  // Form integration
  value?: File[];
  onChange?: (files: File[]) => void;

  // File constraints
  maxFiles?: number; // undefined = infinite
  maxSize?: number; // undefined = infinite (in bytes)
  accept?: string | string[]; // Support AllowedFile presets or custom
  multiple?: boolean; // default: true

  // Validation
  customValidation?: (file: File) => { valid: boolean; message?: string };

  // Callbacks
  onFileAccept?: (file: File) => void;
  onFileReject?: (file: File, message: string) => void;
  onError?: (error: Error) => void;

  // UI Customization
  className?: string;
  dropzoneText?: string; // default: "Drag & drop files here"
  dropzoneDescription?: string; // default: auto-generated based on maxFiles/maxSize
  uploadIcon?: React.ReactNode; // default: <Upload />
  buttonText?: string; // default: "Browse files"
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]; // default: "outline"

  // Error messages (customizable)
  errorMessages?: {
    maxSize?: string; // default: "Maximum file size is X MB"
    maxFiles?: string; // default: "Maximum X files allowed"
  };
}

/**
 * Helper function to format bytes to human-readable size
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Generate default dropzone description based on constraints
 */
function generateDefaultDescription(
  maxFiles?: number,
  maxSize?: number,
  multiple?: boolean,
): string {
  const parts: string[] = ["Or click to browse"];

  const constraints: string[] = [];
  if (maxFiles !== undefined) {
    constraints.push(`max ${maxFiles} file${maxFiles !== 1 ? "s" : ""}`);
  }
  if (maxSize !== undefined) {
    constraints.push(`up to ${formatBytes(maxSize)} each`);
  }

  if (constraints.length > 0) {
    parts.push(`(${constraints.join(", ")})`);
  }

  return parts.join(" ");
}

export function AppFileUpload({
  value,
  onChange,
  maxFiles,
  maxSize,
  accept,
  multiple = true,
  customValidation,
  onFileAccept,
  onFileReject,
  onError,
  className = "w-full max-w-md",
  dropzoneText = "Drag & drop files here",
  dropzoneDescription,
  uploadIcon,
  buttonText = "Browse files",
  buttonVariant = "outline",
  errorMessages,
}: AppFileUploadProps) {
  const [files, setFiles] = React.useState<File[]>(value || []);

  // Sync internal state with external value
  React.useEffect(() => {
    if (value !== undefined) {
      setFiles(value);
    }
  }, [value]);

  const handleValueChange = React.useCallback(
    (newFiles: File[]) => {
      setFiles(newFiles);
      onChange?.(newFiles);

      // Call onFileAccept for newly added files
      if (onFileAccept) {
        const addedFiles = newFiles.filter((f) => !files.includes(f));
        addedFiles.forEach(onFileAccept);
      }
    },
    [files, onChange, onFileAccept],
  );

  const handleFileReject = React.useCallback(
    (file: File, message: string) => {
      toast(message, {
        description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
      });
      onFileReject?.(file, message);
    },
    [onFileReject],
  );

  // Generate accept string from array if needed
  const acceptString = React.useMemo(() => {
    if (!accept) return undefined;
    return Array.isArray(accept) ? accept.join(",") : accept;
  }, [accept]);

  // Generate default error messages
  const defaultErrorMessages = React.useMemo(() => {
    return {
      maxSize:
        maxSize !== undefined
          ? `Maximum file size is ${formatBytes(maxSize)}`
          : undefined,
      maxFiles:
        maxFiles !== undefined
          ? `Maximum ${maxFiles} files allowed`
          : undefined,
    };
  }, [maxSize, maxFiles]);

  const finalErrorMessages = {
    ...defaultErrorMessages,
    ...errorMessages,
  };

  // Generate description
  const finalDescription =
    dropzoneDescription ??
    generateDefaultDescription(maxFiles, maxSize, multiple);

  const finalUploadIcon = uploadIcon ?? (
    <Upload className="size-6 text-muted-foreground" />
  );

  return (
    <FileUpload
      maxFiles={maxFiles}
      maxSize={maxSize}
      accept={acceptString}
      className={className}
      value={files}
      onValueChange={handleValueChange}
      onFileReject={handleFileReject}
      multiple={multiple}
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            {finalUploadIcon}
          </div>
          <p className="font-medium text-sm">{dropzoneText}</p>
          <p className="text-muted-foreground text-xs">{finalDescription}</p>
        </div>

        <FileUploadTrigger asChild>
          <Button variant={buttonVariant} size="sm" className="mt-2 w-fit">
            {buttonText}
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>

      <FileUploadList>
        {files.map((file) => (
          <FileUploadItem key={file.name} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
