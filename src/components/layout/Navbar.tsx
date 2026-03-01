"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import CTAButton from "@/components/ui/CTAButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname  = usePathname();
  const menuRef   = useRef<HTMLDivElement>(null);

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Cerrar menú al hacer clic afuera
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Prevenir scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-kaizer-dark/95 backdrop-blur-md border-b border-kaizer-border shadow-lg shadow-black/20"
          : "bg-kaizer-dark/80 backdrop-blur-sm border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 select-none group"
            aria-label="Kaizer Servicios — inicio"
          >
            {/* Bloque de color del logo */}
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-kaizer-blue text-white font-bold text-sm tracking-tight transition-transform duration-200 group-hover:scale-105"
            >
              K
            </span>
            <span className="text-kaizer-white font-semibold text-base tracking-tight">
              {SITE_NAME}
            </span>
          </Link>

          {/* ── Nav desktop ── */}
          <nav aria-label="Navegación principal" className="hidden lg:flex">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        "relative px-3 py-2 text-sm rounded-[var(--radius-sm)] transition-colors duration-150",
                        isActive
                          ? "text-white font-medium"
                          : "text-kaizer-muted hover:text-kaizer-light",
                      ].join(" ")}
                    >
                      {link.label}
                      {/* Subrayado activo */}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0.5 left-3 right-3 h-px bg-kaizer-blue rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── CTA desktop + hamburger ── */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <CTAButton href="/contacto" size="sm">
                Solicitar presupuesto
              </CTAButton>
            </div>

            {/* Botón hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-[var(--radius-sm)] text-kaizer-light hover:text-white hover:bg-kaizer-surface transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-kaizer-blue"
            >
              {/* 3 líneas animadas */}
              <span
                className={[
                  "block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center",
                  menuOpen ? "rotate-45 translate-y-2" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-0.5 w-5 bg-current rounded-full transition-all duration-300",
                  menuOpen ? "opacity-0 scale-x-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center",
                  menuOpen ? "-rotate-45 -translate-y-2" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Menú mobile ── */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={[
          "lg:hidden absolute inset-x-0 top-16 bg-kaizer-dark/98 backdrop-blur-md border-b border-kaizer-border transition-all duration-300 overflow-hidden",
          menuOpen ? "max-h-[calc(100dvh-4rem)] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "flex items-center px-4 py-3 rounded-[var(--radius-md)] text-sm transition-colors duration-150",
                      isActive
                        ? "bg-kaizer-blue/10 text-white font-medium border-l-2 border-kaizer-blue"
                        : "text-kaizer-muted hover:bg-kaizer-surface hover:text-kaizer-light",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 pt-4 border-t border-kaizer-border">
            <CTAButton href="/contacto" fullWidth size="md">
              Solicitar presupuesto
            </CTAButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
