import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title:       "Acerca de nosotros",
  description: "Conocé la historia, el equipo y los valores de Kaizer Servicios, empresa industrial en Mar del Plata.",
};

export default function NosotrosPage() {
  return (
    <>
      {/* ── Encabezado ── */}
      <header className="py-16 bg-kaizer-surface border-b border-kaizer-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-kaizer-blue text-sm font-semibold uppercase tracking-widest">
              Quiénes somos
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-kaizer-white leading-tight">
              Acerca de nosotros
            </h1>
            <p className="mt-4 text-kaizer-muted text-lg leading-relaxed">
              Más de una década de experiencia en servicios industriales,
              construyendo relaciones de largo plazo con nuestros clientes.
            </p>
          </div>
        </Container>
      </header>

      {/* ── Historia / Misión ── */}
      <section aria-label="Historia y misión" className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Texto */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold text-kaizer-white mb-3">Nuestra historia</h2>
                <p className="text-kaizer-muted leading-relaxed">
                  {/* Contenido real en la siguiente fase */}
                  Kaizer Servicios nació en Mar del Plata con el objetivo de brindar
                  soluciones industriales de calidad a empresas de la región. A lo
                  largo de los años construimos un equipo sólido y una reputación
                  basada en el cumplimiento y la excelencia técnica.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-kaizer-white mb-3">Nuestra misión</h2>
                <p className="text-kaizer-muted leading-relaxed">
                  Ser el socio estratégico de confianza para empresas industriales
                  que buscan optimizar sus operaciones, reducir costos y garantizar
                  la continuidad de sus procesos productivos.
                </p>
              </div>
              <CTAButton href="/contacto" variant="outline" className="self-start">
                Contactar al equipo
              </CTAButton>
            </div>

            {/* Valores */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { title: "Compromiso",    desc: "Cumplimos lo que prometemos, siempre." },
                { title: "Calidad",       desc: "Estándares altos en cada trabajo." },
                { title: "Innovación",    desc: "Adoptamos tecnología para mejores resultados." },
                { title: "Transparencia", desc: "Comunicación clara con cada cliente." },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface p-5"
                >
                  <div className="h-1 w-8 bg-kaizer-blue rounded-full mb-3" />
                  <h3 className="font-semibold text-kaizer-white mb-1">{title}</h3>
                  <p className="text-sm text-kaizer-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Equipo (placeholder) ── */}
      <section aria-label="Nuestro equipo" className="py-16 bg-kaizer-surface border-t border-kaizer-border">
        <Container>
          <h2 className="text-2xl font-bold text-kaizer-white mb-10 text-center">
            El equipo
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-center">
                <div className="h-20 w-20 rounded-full bg-kaizer-border" />
                <div className="space-y-1">
                  <div className="h-4 w-24 mx-auto rounded bg-kaizer-border" />
                  <div className="h-3 w-16 mx-auto rounded bg-kaizer-border/60" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
