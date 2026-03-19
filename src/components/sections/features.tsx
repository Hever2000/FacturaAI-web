"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  ScanLine, 
  Brain, 
  Zap, 
  FileJson, 
  Shield, 
  Globe,
  Clock,
  Code2
} from "lucide-react";

const features = [
  {
    icon: ScanLine,
    title: "OCR Avanzado",
    description: "Motor PaddleOCR-VL con precisión superior al 99% en reconocimiento de texto.",
    color: "text-blue-400",
  },
  {
    icon: Brain,
    title: "IA Contextual",
    description: "Groq (Llama 3.3) entiende el contexto de facturas argentinas y extrae campos específicos.",
    color: "text-purple-400",
  },
  {
    icon: Zap,
    title: "Ultra Rápido",
    description: "Procesamiento en menos de 5 segundos gracias a la potencia de Groq.",
    color: "text-yellow-400",
  },
  {
    icon: FileJson,
    title: "JSON Estructurado",
    description: "Datos输出 en formato JSON estándar, listos para integrar con cualquier sistema.",
    color: "text-teal-400",
  },
  {
    icon: Shield,
    title: "Compatible AFIP",
    description: "Entiende el formato oficial de facturación electrónica argentino.",
    color: "text-emerald-400",
  },
  {
    icon: Globe,
    title: "Multi-idioma",
    description: "Soporte para texto en español e inglés en la misma factura.",
    color: "text-cyan-400",
  },
  {
    icon: Clock,
    title: "Alta Disponibilidad",
    description: "API desplegada en Kubernetes con redundancia y auto-scaling.",
    color: "text-orange-400",
  },
  {
    icon: Code2,
    title: "SDKs Oficiales",
    description: "Librerías para Python, JavaScript, TypeScript y más.",
    color: "text-rose-400",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Características
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para procesar facturas de forma automatizada
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="pt-6">
                <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
