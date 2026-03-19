"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const codeExamples = {
  curl: `curl -X POST "https://api.facturaai.com/v1/process" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@factura.pdf"`,
  javascript: `const formData = new FormData();
formData.append('file', document.querySelector('#file').files[0]);

const response = await fetch('https://api.facturaai.com/v1/process', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const { job_id } = await response.json();`,
  python: `import requests

url = "https://api.facturaai.com/v1/process"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
files = {"file": open("factura.pdf", "rb")}

response = requests.post(url, headers=headers, files=files)
job_id = response.json()["job_id"]`,
};

const responseExample = {
  job_id: "550e8400-e29b-41d4-a716-446655440000",
  status: "PROCESSED",
  extracted_data: {
    tipo_comprobante: "FC",
    letra_comprobante: "A",
    punto_de_venta: "0001",
    numero_comprobante: "00001293",
    fecha_emision: "2024-01-15",
    razon_social_vendedor: "Empresa S.A.",
    vendedor_cuit: "30-12345678-9",
    total: 12100.00,
    total_iva: 2100.00,
    items: [
      {
        descripcion: "Servicio de consultoría",
        cantidad: 10,
        precio_unitario: 1000.00,
        total_item: 12100.00
      }
    ]
  }
};

export function APISection() {
  const [activeTab, setActiveTab] = useState<"curl" | "javascript" | "python">("curl");
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="api" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            API REST
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Integración simple con tu aplicación existente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Ejemplo de Request</CardTitle>
              <CardDescription>
                Endpoint: POST /v1/process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                {(["curl", "javascript", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                      activeTab === lang
                        ? "bg-teal-500 text-white"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <pre className="rounded-lg bg-[#0d1117] p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{codeExamples[activeTab]}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode(codeExamples[activeTab], "request")}
                >
                  {copied === "request" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ejemplo de Response</CardTitle>
              <CardDescription>
                Estado: 200 OK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="rounded-lg bg-[#0d1117] p-4 overflow-x-auto text-sm max-h-[400px] overflow-y-auto">
                  <code className="text-gray-300">
                    {JSON.stringify(responseExample, null, 2)}
                  </code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode(JSON.stringify(responseExample, null, 2), "response")}
                >
                  {copied === "response" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <a href="/docs" target="_blank">
              Ver Documentación Completa
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
