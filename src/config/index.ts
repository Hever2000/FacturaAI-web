export const appConfig = {
  name: "FacturaAI",
  description: "OCR + IA para Facturas Argentinas",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
} as const;

export const appConstants = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedFormats: [".pdf", ".jpg", ".jpeg", ".png", ".webp"],
  allowedMimeTypes: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ],
} as const;
