"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Upload, Scan, Brain, FileJson } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Sube tu factura",
    description: "Arrastra o selecciona una imagen o PDF de tu factura argentina.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Scan,
    title: "OCR Avanzado",
    description: "PaddleOCR-VL extrae todo el texto con alta precisión, incluso de documentos complejos.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Brain,
    title: "IA Estructura",
    description: "Groq (Llama 3.3) analiza y extrae campos específicos del formato AFIP.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: FileJson,
    title: "JSON Listo",
    description: "Recibe datos estructurados: vendedor, cliente, items, totales, IVA y más.",
    color: "from-emerald-500 to-emerald-600",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            En cuatro simples pasos, transforma facturas en datos estructurados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="relative overflow-hidden group hover:border-teal-500/50 transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />
              
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${step.color} shadow-lg`}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-500/30 text-sm font-bold text-teal-400">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
