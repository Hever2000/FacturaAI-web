"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
        <div className="animate-fade-in mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-400">
            <Zap className="h-4 w-4" />
            Powered by Groq + PaddleOCR-VL
          </span>
        </div>
        
        <h1 className="animate-slide-up mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Procesa facturas con{" "}
          <span className="text-gradient">IA en segundos</span>
        </h1>
        
        <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Extrae automáticamente datos estructurados de facturas argentinas.
          OCR inteligente + IA que entiende el formato AFIP.
        </p>
        
        <div className="animate-slide-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="group">
            <Link href="#demo">
              Probar Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#api">
              Ver Documentación
            </Link>
          </Button>
        </div>
        
        <div className="animate-slide-up mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: "< 5s", label: "Tiempo de respuesta" },
            { value: "99.8%", label: "Precisión OCR" },
            { value: "PDF + Imagen", label: "Formatos" },
            { value: "JSON", label: "Salida" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
