import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title:       "Catálogo de Productos",
  description: "Explorá nuestro catálogo de productos y equipos industriales disponibles en Kaizer Servicios.",
};

export default function CatalogoPage() {
  return (
    <>
      {/* ── Encabezado ── */}
      <header className="py-16 bg-kaizer-surface border-b border-kaizer-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-kaizer-cyan text-sm font-semibold uppercase tracking-widest">
              Productos
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-kaizer-white leading-tight">
              Catálogo
            </h1>
            <p className="mt-4 text-kaizer-muted text-lg leading-relaxed">
              Explorá nuestro catálogo completo de productos y equipos
              industriales. Calidad garantizada y disponibilidad inmediata.
            </p>
          </div>
        </Container>
      </header>

      {/* ── Filtros (placeholder) ── */}
      <section aria-label="Filtros de catálogo" className="py-6 border-b border-kaizer-border bg-kaizer-surface/50">
        <Container>
          <div className="flex flex-wrap gap-2">
            {["Todos", "Equipos", "Herramientas", "Insumos", "Repuestos"].map((cat) => (
              <button
                key={cat}
                className={[
                  "px-4 py-1.5 rounded-full text-sm border transition-colors duration-150",
                  cat === "Todos"
                    ? "bg-kaizer-cyan border-kaizer-cyan text-white"
                    : "bg-transparent border-kaizer-border text-kaizer-muted hover:border-kaizer-cyan/50 hover:text-kaizer-light",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Grid de productos (placeholder) ── */}
      <section aria-label="Productos" className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface overflow-hidden flex flex-col"
              >
                {/* Imagen placeholder */}
                <div className="aspect-square bg-kaizer-border/30 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-[var(--radius-md)] bg-kaizer-border" />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 w-3/4 rounded bg-kaizer-border" />
                  <div className="h-3 w-full rounded bg-kaizer-border/60" />
                  <div className="h-3 w-2/3 rounded bg-kaizer-border/60" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-kaizer-surface border-t border-kaizer-border">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-kaizer-white mb-3">
            ¿Necesitás un producto específico?
          </h2>
          <p className="text-kaizer-muted mb-6">
            Si no lo ves en el catálogo, consultanos. Podemos conseguirlo para vos.
          </p>
          <CTAButton href="/contacto">Hacer consulta</CTAButton>
        </Container>
      </section>
    </>
  );
}
