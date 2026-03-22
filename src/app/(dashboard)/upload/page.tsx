'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Loader2, Check, X, Copy, Download } from 'lucide-react';
import { jobsApi } from '@/lib/api/jobs';
import { cn } from '@/lib/utils';

export default function UploadPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>(
    'idle'
  );
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setResult(null);

    // Create preview
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    setStatus('uploading');

    try {
      // Upload file
      const uploadResponse = await jobsApi.process(selectedFile);
      const { job_id } = uploadResponse.data;

      setStatus('processing');

      // Poll for result
      const pollResult = async () => {
        const jobResponse = await jobsApi.get(job_id);
        const job = jobResponse.data;

        if (job.status === 'processing') {
          setTimeout(pollResult, 2000);
        } else if (job.status === 'completed') {
          setResult(job);
          setStatus('success');
        } else {
          setError('El procesamiento falló');
          setStatus('error');
        }
      };

      pollResult();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al procesar el archivo');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const copyToClipboard = () => {
    if (result?.extracted_data) {
      navigator.clipboard.writeText(JSON.stringify(result.extracted_data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reset = () => {
    setStatus('idle');
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Procesar Factura</h1>
        <p className="text-slate-400">Subí una factura para extraer los datos automáticamente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle>Factura</CardTitle>
            <CardDescription>PNG, JPG, PDF • Máx 10MB</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                'relative border-2 border-dashed rounded-lg min-h-[300px] flex flex-col items-center justify-center p-8 transition-colors cursor-pointer',
                dragActive ? 'border-teal-500 bg-teal-500/10' : 'border-slate-700',
                status !== 'idle' && 'pointer-events-none opacity-50'
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => status === 'idle' && document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleChange}
              />

              {preview ? (
                <div className="w-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-[300px] mx-auto rounded-lg object-contain"
                  />
                  <div className="mt-4 text-center text-sm text-slate-500">{file?.name}</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                    <Upload className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="mt-4 text-sm text-slate-400">
                    Arrastrá tu factura aquí o hacé click
                  </p>
                </div>
              )}

              {status === 'uploading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-lg">
                  <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
                </div>
              )}

              {status === 'processing' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-lg">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-500 mx-auto" />
                    <p className="mt-2 text-sm text-slate-400">Procesando con IA...</p>
                  </div>
                </div>
              )}
            </div>

            {status !== 'idle' && (
              <Button variant="outline" className="w-full mt-4" onClick={reset}>
                Nueva factura
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Result */}
        <div className="space-y-4">
          {status === 'error' && (
            <Card className="border-red-500/50 bg-red-500/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-400">
                  <X className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {status === 'success' && result && (
            <>
              <Card className="border-teal-500/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-teal-500" />
                    <CardTitle>Procesamiento completado</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/jobs/${result.id}`)}
                    >
                      Ver detalle
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg">Datos extraídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-slate-400">Tipo:</div>
                      <div>{result.extracted_data?.tipo_comprobante || '-'}</div>
                      <div className="text-slate-400">Número:</div>
                      <div>{result.extracted_data?.numero_comprobante || '-'}</div>
                      <div className="text-slate-400">Fecha:</div>
                      <div>{result.extracted_data?.fecha_emision || '-'}</div>
                      <div className="text-slate-400">Vendedor:</div>
                      <div>{result.extracted_data?.razon_social_vendedor || '-'}</div>
                      <div className="text-slate-400">CUIT Vendedor:</div>
                      <div>{result.extracted_data?.vendedor_cuit || '-'}</div>
                      <div className="text-slate-400">Total:</div>
                      <div className="font-bold text-teal-400">
                        ${result.extracted_data?.total?.toLocaleString('es-AR') || '-'}
                      </div>
                    </div>

                    {result.confidence_score && (
                      <div className="pt-2 border-t border-slate-800">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-400">Confianza</span>
                          <span>{Math.round(result.confidence_score * 100)}%</span>
                        </div>
                        <Progress value={result.confidence_score * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">JSON</CardTitle>
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-[300px] overflow-auto rounded-lg bg-slate-900 p-4 text-xs">
                    {JSON.stringify(result.extracted_data, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </>
          )}

          {status === 'idle' && (
            <Card className="border-slate-800">
              <CardContent className="py-12 text-center text-slate-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Subí una factura para ver los resultados</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
