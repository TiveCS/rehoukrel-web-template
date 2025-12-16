/**
 * Predefined file type accept patterns for file uploads
 * Can be used individually or combined in arrays
 *
 * @example
 * accept={AllowedFile.Images}
 * accept={[AllowedFile.Images, AllowedFile.Pdf]}
 * accept=".custom,.ext"
 */
export const AllowedFile = {
  // Images
  Images: "image/*",
  Png: ".png",
  Jpg: ".jpg,.jpeg",
  Gif: ".gif",
  Svg: ".svg",
  Webp: ".webp",

  // Documents
  Pdf: ".pdf",
  Doc: ".doc,.docx",
  Docx: ".docx",
  Txt: ".txt",
  Rtf: ".rtf",

  // Spreadsheets
  Excel: ".xls,.xlsx",
  Csv: ".csv",

  // Presentations
  PowerPoint: ".ppt,.pptx",

  // Archives
  Zip: ".zip",
  Rar: ".rar",
  SevenZ: ".7z",
  Tar: ".tar,.tar.gz",

  // Media
  Video: "video/*",
  Audio: "audio/*",
  Mp4: ".mp4",
  Avi: ".avi",
  Mov: ".mov",
  Webm: ".webm",
  Mp3: ".mp3",
  Wav: ".wav",

  // Code
  Json: ".json",
  Xml: ".xml",
  Yaml: ".yaml,.yml",

  // All common documents
  Documents: ".pdf,.doc,.docx,.txt,.rtf",
  AllDocuments: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf",
} as const;

/**
 * Helper function to combine multiple AllowedFile types
 */
export function combineAllowedFiles(...types: string[]): string {
  return types.join(",");
}
