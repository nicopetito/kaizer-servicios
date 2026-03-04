"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "@/lib/constants";
import CTAButton from "@/components/ui/CTAButton";

/* ─── Logos ──────────────────────────────────────────────────── */
function LogoForLight() {
  return (
    <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kaizer Servicios" className="h-8 w-auto">
      <rect x="0" y="0" width="36" height="36" rx="10" fill="#00C0DE" opacity="0.1" />
      <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="#00C0DE" strokeWidth="1" opacity="0.3" />
      <rect x="10" y="9" width="4" height="18" rx="1.5" fill="#0A0F1E" />
      <path d="M14 18 L26 9 L26 13 L17 18.5Z" fill="#00C0DE" />
      <path d="M14 18 L26 27 L26 23 L17 17.5Z" fill="#0A0F1E" />
      <text x="44" y="14" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" fill="#0A0F1E">KAIZER</text>
      <text x="44" y="27" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="400" letterSpacing="3" fill="#7A95B0">SERVICIOS</text>
    </svg>
  );
}

function LogoForDark() {
  return (
    <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kaizer Servicios" className="h-8 w-auto">
      <rect x="0" y="0" width="36" height="36" rx="10" fill="#00C0DE" opacity="0.15" />
      <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="#00C0DE" strokeWidth="1" opacity="0.5" />
      <rect x="10" y="9" width="4" height="18" rx="1.5" fill="#ffffff" />
      <path d="M14 18 L26 9 L26 13 L17 18.5Z" fill="#00C0DE" />
      <path d="M14 18 L26 27 L26 23 L17 17.5Z" fill="#ffffff" />
      <text x="44" y="14" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" fill="#ffffff">KAIZER</text>
      <text x="44" y="27" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="400" letterSpacing="3" fill="rgba(255,255,255,0.55)">SERVICIOS</text>
    </svg>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const pathname  = usePathname();
  const menuRef   = useRef<HTMLDivElement>(null);

  /* Hidratación: marca que ya estamos en el cliente */
  useEffect(() => { setMounted(true); }, []);

  /* Scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // sincroniza al montar (evita flash si ya está scrolleado)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cierra menú al cambiar de ruta */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Cierra menú al click fuera */
  useEffect(() => {
    if (!menuOpen) return;
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menuOpen]);

  /* Bloquea scroll del body con menú abierto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /*
   * heroMode: home page + sin scroll.
   * No usamos `mounted` para esta condición para que SSR y cliente
   * coincidan desde el primer render, evitando el flash de hidratación.
   * usePathname() retorna el pathname correcto en SSR (Next.js App Router).
   */
  const isHome = pathname === "/";
  const heroMode = isHome && !scrolled;

  // mounted se usa solo para features que requieren el DOM (ninguno aquí)
  void mounted;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        heroMode
          ? "bg-transparent backdrop-blur-md border-b border-white/10"
          : "bg-white/92 backdrop-blur-xl border-b border-[#E4EBF5] shadow-[0_1px_12px_rgba(10,15,30,0.06)]",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center select-none transition-opacity duration-150 hover:opacity-80"
            aria-label="Kaizer Servicios — inicio"
          >
            {heroMode ? <LogoForDark /> : <LogoForLight />}
          </Link>

          {/* Nav desktop */}
          <nav aria-label="Navegación principal" className="hidden lg:flex">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        "relative px-4 py-2 text-sm rounded-full transition-all duration-200 group",
                        heroMode
                          ? isActive ? "text-white font-semibold" : "text-white/75 hover:text-white"
                          : isActive ? "text-[#0A0F1E] font-semibold" : "text-[#7A95B0] hover:text-[#0A0F1E]",
                      ].join(" ")}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute bottom-0.5 left-4 right-4 h-px rounded-full transition-all duration-300 origin-center",
                          heroMode ? "bg-white" : "bg-[#00C0DE]",
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60",
                        ].join(" ")}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              {heroMode ? (
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 text-white/90 text-sm font-semibold px-5 py-2 hover:bg-white/15 hover:border-white/65 transition-all duration-200"
                >
                  Solicitar presupuesto
                </a>
              ) : (
                <CTAButton href="/contacto" size="sm">
                  Solicitar presupuesto
                </CTAButton>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className={[
                "lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-full transition-all duration-150",
                heroMode
                  ? "text-white hover:bg-white/10"
                  : "text-[#3D5068] hover:text-[#0A0F1E] hover:bg-[#F6F9FC]",
              ].join(" ")}
            >
              <span className={["block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center", menuOpen ? "rotate-45 translate-y-2" : ""].join(" ")} />
              <span className={["block h-0.5 w-5 bg-current rounded-full transition-all duration-300", menuOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
              <span className={["block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center", menuOpen ? "-rotate-45 -translate-y-2" : ""].join(" ")} />
            </button>
          </div>
        </div>
      </div>

      {/* Menú mobile */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={[
          "lg:hidden absolute inset-x-0 top-16 backdrop-blur-xl border-b transition-all duration-300 overflow-hidden",
          heroMode ? "bg-[#07090E]/80 border-white/10" : "bg-white/95 border-[#E4EBF5]",
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
                      "flex items-center px-4 py-3.5 rounded-xl text-base transition-all duration-150",
                      heroMode
                        ? isActive
                          ? "bg-white/10 text-white font-semibold border-l-2 border-[#00C0DE]"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                        : isActive
                        ? "bg-[#E6F9FD] text-[#0A0F1E] font-semibold border-l-2 border-[#00C0DE]"
                        : "text-[#3D5068] hover:bg-[#F6F9FC] hover:text-[#0A0F1E]",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={["mt-4 pt-4 border-t", heroMode ? "border-white/10" : "border-[#E4EBF5]"].join(" ")}>
            <CTAButton href="/contacto" fullWidth size="md">
              Solicitar presupuesto
            </CTAButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
