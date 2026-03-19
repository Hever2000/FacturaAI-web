"use client";

import Link from "next/link";
import { FileText, Github, Twitter, Mail } from "lucide-react";

const footerLinks = {
  producto: [
    { name: "Demo", href: "#demo" },
    { name: "Características", href: "#features" },
    { name: "Precios", href: "#" },
    { name: "Documentación", href: "/docs" },
  ],
  recursos: [
    { name: "API Reference", href: "/docs/api" },
    { name: "GitHub", href: "https://github.com" },
    { name: "Status", href: "#" },
    { name: "Changelog", href: "#" },
  ],
  empresa: [
    { name: "Sobre nosotros", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contacto", href: "mailto:contacto@facturaai.com" },
    { name: "Términos", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">FacturaAI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              OCR + IA para procesar facturas argentinas de forma automática.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@facturaai.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Producto</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.producto.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Recursos</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Empresa</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 FacturaAI. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
