import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "FacturaAI - OCR + IA para Facturas Argentinas",
  description:
    "Procesa facturas argentinas automáticamente con OCR e IA. Extrae datos estructurados en segundos.",
  keywords: ["OCR", "facturas", "Argentina", "IA", "extracción", "AFIP"],
  authors: [{ name: "FacturaAI" }],
  openGraph: {
    title: "FacturaAI - OCR + IA para Facturas Argentinas",
    description:
      "Procesa facturas argentinas automáticamente con OCR e IA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
