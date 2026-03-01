import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title:       SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        aria-label="Sección principal"
        className="relative flex flex-col items-center justify-center text-center min-h-[calc(100dvh-4rem)] px-4 py-20 overflow-hidden"
      >
        {/* Fondo con gradiente sutil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-kaizer-cyan/5 via-transparent to-transparent"
        />

        <Container>
          <div className="mx-auto max-w-3xl flex flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-kaizer-cyan/30 bg-kaizer-cyan/10 px-4 py-1.5 text-xs font-medium text-kaizer-cyan uppercase tracking-widest">
              Mar del Plata · Servicios Industriales
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-kaizer-white leading-tight tracking-tight">
              Soluciones industriales{" "}
              <span className="text-kaizer-cyan">a medida</span>
            </h1>

            <p className="text-kaizer-muted text-lg sm:text-xl max-w-2xl leading-relaxed">
              Somos el socio estratégico que tu empresa necesita para optimizar
              procesos, mantener equipos y ejecutar proyectos con la máxima
              eficiencia y calidad.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <CTAButton href="/contacto" size="lg">
                Solicitar presupuesto
              </CTAButton>
              <CTAButton href="/servicios" size="lg" variant="outline">
                Ver servicios
              </CTAButton>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats / Valores ── */}
      <section aria-label="Cifras destacadas" className="py-16 border-y border-kaizer-border bg-kaizer-surface">
        <Container>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: "+10",    label: "Años de experiencia" },
              { value: "+200",   label: "Proyectos ejecutados" },
              { value: "100%",   label: "Compromisos cumplidos" },
              { value: "24/7",   label: "Soporte técnico" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="text-3xl font-bold text-kaizer-cyan">{value}</dt>
                <dd className="text-sm text-kaizer-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── CTA Final ── */}
      <section aria-label="Llamada a la acción" className="py-20">
        <Container className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-kaizer-white mb-4">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="text-kaizer-muted mb-8 max-w-xl mx-auto">
            Contanos qué necesitás y te preparamos un presupuesto sin cargo.
          </p>
          <CTAButton href="/contacto" size="lg">
            Hablar con nosotros
          </CTAButton>
        </Container>
      </section>
    </>
  );
}
