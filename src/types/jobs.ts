export interface Job {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  filename: string;
  created_at: string;
  confidence_score?: number;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface JobDetail extends Job {
  extracted_data: ExtractedData;
  ocr_engine: string;
  processing_time?: number;
}

export interface ExtractedData {
  tipo_comprobante?: string;
  letra_comprobante?: string;
  punto_de_venta?: string;
  numero_comprobante?: string;
  fecha_emision?: string;
  razon_social_vendedor?: string;
  vendedor_cuit?: string;
  vendedor_condicion_iva?: string;
  vendedor_domicilio?: string;
  razon_social_cliente?: string;
  cliente_cuit?: string;
  cliente_condicion_iva?: string;
  importe_neto_gravado?: number;
  iva_21?: number;
  iva_10_5?: number;
  iva_27?: number;
  subtotal?: number;
  total?: number;
  condicion_pago?: string;
  cae?: string;
  items?: JobItem[];
}

export interface JobItem {
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  total_item: number;
}

export interface ProcessResponse {
  job_id: string;
  status: string;
}

export interface JobCreateResponse {
  job_id: string;
}

export interface FeedbackRequest {
  extracted_data: Record<string, unknown>;
  corrections: Record<string, unknown>;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
}
