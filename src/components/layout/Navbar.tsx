"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "@/lib/constants";
import CTAButton from "@/components/ui/CTAButton";

// ─── Logo SVG — fiel al estilo del logo Kaizer ────────────────────
// La "K" tiene la barra vertical en blanco y el brazo superior en cian.
// Cuando tengas el archivo PNG/SVG real, reemplazá este componente por:
//   <Image src="/logo.png" alt="Kaizer Servicios" width={120} height={40} priority />
function KaizerLogo() {
  return (
    <svg
      viewBox="0 0 110 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kaizer Servicios"
      className="h-8 w-auto"
    >
      {/* ── Ícono K ── */}
      {/* Fondo circular */}
      <rect x="0" y="0" width="36" height="36" rx="18" fill="#07090E" />
      {/* Borde sutil */}
      <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="#1A2235" strokeWidth="1" />
      {/* Barra vertical de la K — blanco */}
      <rect x="10" y="9" width="4" height="18" rx="1.5" fill="#EEF4FB" />
      {/* Brazo superior — CIAN (el color del logo) */}
      <path d="M14 18 L26 9 L26 13 L17 18.5Z" fill="#00C0DE" />
      {/* Brazo inferior — blanco */}
      <path d="M14 18 L26 27 L26 23 L17 17.5Z" fill="#EEF4FB" />

      {/* ── Texto KAIZER ── */}
      <text
        x="42"
        y="14"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="2"
        fill="#EEF4FB"
      >
        KAIZER
      </text>
      <text
        x="42"
        y="27"
        fontFamily="Inter, sans-serif"
        fontSize="7.5"
        fontWeight="400"
        letterSpacing="3"
        fill="#8FA3BB"
      >
        SERVICIOS
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname  = usePathname();
  const menuRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-kaizer-dark/96 backdrop-blur-md border-b border-kaizer-border shadow-lg shadow-black/30"
          : "bg-kaizer-dark/85 backdrop-blur-sm border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center select-none group transition-opacity duration-150 hover:opacity-90"
            aria-label="Kaizer Servicios — inicio"
          >
            <KaizerLogo />
          </Link>

          {/* ── Nav desktop ── */}
          <nav aria-label="Navegación principal" className="hidden lg:flex">
            <ul className="flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        "relative px-3.5 py-2 text-sm rounded-[var(--radius-sm)] transition-colors duration-150",
                        isActive
                          ? "text-white font-semibold"
                          : "text-kaizer-muted hover:text-kaizer-white",
                      ].join(" ")}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0.5 left-3.5 right-3.5 h-px bg-kaizer-cyan rounded-full"
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

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-[var(--radius-sm)] text-kaizer-light hover:text-white hover:bg-kaizer-surface transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-kaizer-cyan"
            >
              <span className={["block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center", menuOpen ? "rotate-45 translate-y-2" : ""].join(" ")} />
              <span className={["block h-0.5 w-5 bg-current rounded-full transition-all duration-300", menuOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
              <span className={["block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center", menuOpen ? "-rotate-45 -translate-y-2" : ""].join(" ")} />
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
                      "flex items-center px-4 py-3.5 rounded-[var(--radius-md)] text-base transition-colors duration-150",
                      isActive
                        ? "bg-kaizer-cyan/10 text-white font-semibold border-l-2 border-kaizer-cyan"
                        : "text-kaizer-light hover:bg-kaizer-surface hover:text-white",
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
