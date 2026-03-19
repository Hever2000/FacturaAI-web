"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Cómo funciona", href: "#como-funciona" },
  { name: "Demo", href: "#demo" },
  { name: "Features", href: "#features" },
  { name: "API", href: "#api" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Factura<span className="text-gradient">AI</span>
          </span>
        </div>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://github.com" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="#demo">Probar Demo</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden glass border-t",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="space-y-2 px-6 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" className="flex-1" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button size="sm" className="flex-1" asChild>
              <Link href="#demo">Probar Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
