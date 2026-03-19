"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileJson, Copy, Check, Loader2, Image, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ProcessingStatus = "idle" | "uploading" | "processing" | "success" | "error";

interface ProcessingResult {
  rawText: string;
  extractedData: Record<string, unknown>;
}

export function Demo() {
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const processFile = useCallback(async (file: File) => {
    setFile(file);
    setStatus("uploading");
    setError(null);
    setResult(null);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    try {
      setStatus("processing");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/v1/process`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error processing file");
      }

      const data = await response.json();

      const jobResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/v1/jobs/${data.job_id}`);
      const jobData = await jobResponse.json();

      setResult({
        rawText: jobData.full_text || "",
        extractedData: jobData.extracted_data || {},
      });
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error processing file");
      setStatus("error");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    },
    [processFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        processFile(e.target.files[0]);
      }
    },
    [processFile]
  );

  const copyToClipboard = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result.extractedData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result]);

  const resetDemo = useCallback(() => {
    setStatus("idle");
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  }, []);

  return (
    <section id="demo" className="py-24 px-6 relative bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Demo Interactiva
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sube una factura y ve cómo nuestra IA la procesa en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Factura Original</CardTitle>
              <CardDescription>
                Arrastra o selecciona una imagen o PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-lg min-h-[400px] flex flex-col items-center justify-center p-8 transition-colors",
                  dragActive
                    ? "border-teal-500 bg-teal-500/10"
                    : "border-border",
                  status !== "idle" && "cursor-not-allowed opacity-50"
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                {preview ? (
                  <div className="relative w-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-w-full max-h-[400px] mx-auto rounded-lg object-contain"
                    />
                    {file && (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Arrastra tu factura aquí o{" "}
                      <label className="text-primary cursor-pointer hover:underline">
                        súbela
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={handleChange}
                          disabled={status !== "idle"}
                        />
                      </label>
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      PNG, JPG, PDF • Máx 10MB
                    </p>
                  </div>
                )}

                {status === "uploading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
                  </div>
                )}

                {status === "processing" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-teal-500 mx-auto" />
                      <p className="mt-2 text-sm text-muted-foreground">Procesando con IA...</p>
                    </div>
                  </div>
                )}
              </div>

              {status !== "idle" && (
                <Button variant="outline" className="w-full mt-4" onClick={resetDemo}>
                  Nueva factura
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {status === "error" && (
              <Card className="border-red-500/50 bg-red-500/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-400">Error en el procesamiento</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {status === "success" && result && (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Texto Extraído (OCR)</CardTitle>
                      <CardDescription>Texto reconocido por PaddleOCR-VL</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[200px] overflow-y-auto rounded-lg bg-muted p-4 font-mono text-sm">
                      {result.rawText || "No se pudo extraer texto"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileJson className="h-5 w-5 text-teal-500" />
                        Datos Estructurados
                      </CardTitle>
                      <CardDescription>Datos extraídos por IA</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[400px] overflow-y-auto rounded-lg bg-muted p-4">
                      <pre className="text-xs font-mono whitespace-pre-wrap">
                        {JSON.stringify(result.extractedData, null, 2)}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {status === "idle" && (
              <Card className="border-dashed">
                <CardContent className="py-16">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">
                      Esperando archivo...
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Sube una factura para ver el procesamiento en acción
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
