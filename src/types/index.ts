export interface InvoiceData {
  tipo: string;
  puntoVenta: string;
  numeroComprobante: string;
  fecha: string;
  cuitemisor: string;
  nombreEmisor: string;
  domicilioEmisor: string;
  cuittitular: string;
  nombreTitular: string;
  domicilioTitular: string;
  condicionIva: string;
  importeTotal: number;
  importeNeto: number;
  importeIva: number;
  importeTributos: number;
  codigoBarras: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  alicuotaIva: number;
  importe: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ProcessingResult {
  invoice: InvoiceData;
  confidence: number;
  processingTime: number;
  rawText?: string;
}

export interface UploadResponse {
  id: string;
  filename: string;
  status: "pending" | "processing" | "completed" | "failed";
}
