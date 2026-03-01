import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title:       "Servicios",
  description: "Conocé todos los servicios industriales que ofrece Kaizer Servicios en Mar del Plata.",
};

export default function ServiciosPage() {
  return (
    <>
      {/* ── Encabezado de sección ── */}
      <header className="py-16 bg-kaizer-surface border-b border-kaizer-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-kaizer-blue text-sm font-semibold uppercase tracking-widest">
              Lo que hacemos
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-kaizer-white leading-tight">
              Nuestros Servicios
            </h1>
            <p className="mt-4 text-kaizer-muted text-lg leading-relaxed">
              Brindamos soluciones integrales para el sector industrial, con
              equipos especializados y tecnología de vanguardia.
            </p>
          </div>
        </Container>
      </header>

      {/* ── Grilla de servicios (placeholder) ── */}
      <section aria-label="Lista de servicios" className="py-16">
        <Container>
          {/* Contenido de servicios — se completará en la siguiente fase */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface p-6 flex flex-col gap-3"
              >
                <div className="h-10 w-10 rounded-[var(--radius-md)] bg-kaizer-blue/10 border border-kaizer-blue/20" />
                <div className="h-4 w-3/4 rounded bg-kaizer-border" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-kaizer-border/60" />
                  <div className="h-3 w-5/6 rounded bg-kaizer-border/60" />
                  <div className="h-3 w-4/6 rounded bg-kaizer-border/60" />
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
            ¿No encontrás lo que buscás?
          </h2>
          <p className="text-kaizer-muted mb-6">
            Consultanos y analizamos juntos la mejor solución para tu empresa.
          </p>
          <CTAButton href="/contacto">Consultar ahora</CTAButton>
        </Container>
      </section>
    </>
  );
}
