"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Vote, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/candidatos", label: "Candidatos" },
    { href: "/calendario", label: "Calendario" },
    { href: "/planes", label: "Planes de Gobierno" },
    { href: "/electores", label: "Para Electores" },
    { href: "/miembros-de-mesa", label: "Miembros de Mesa" },
  ];

  // Cerrar menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl hover:opacity-80 transition-opacity"
          >
            <Vote className="size-5 sm:size-6" />
            <span className="hidden sm:inline">ElectorAI</span>
            <span className="sm:hidden">EA</span>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Menú Tablet (más compacto) */}
          <div className="hidden md:flex lg:hidden items-center gap-1">
            {navLinks.slice(0, 3).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-2 py-2 text-xs font-medium transition-colors rounded-md",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-accent"
                  )}
                >
                  {link.label.split(" ")[0]}
                </Link>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              Más
            </Button>
          </div>

          {/* Botón Menú Móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 border-b bg-background backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium transition-colors rounded-md",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </nav>
  );
}
