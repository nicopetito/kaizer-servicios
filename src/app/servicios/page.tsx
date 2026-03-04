import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const dynamic = "force-dynamic";
import CTAButton from "@/components/ui/CTAButton";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Servicio } from "@/lib/types";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Conocé todos los servicios industriales que ofrece Kaizer Servicios en Mar del Plata.",
};

// Mapeo de nombre de ícono → SVG (los íconos siguen siendo locales)
function IconoServicio({ icono }: { icono: string | null }) {
  const iconos: Record<string, React.ReactNode> = {
    paint: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 0 0-3-3z" />
        <path d="M9 8c-2 3-4 3.5-7 4l8 8c.5-3 1-5 4-7" />
        <path d="M4.5 20v-3h3" />
      </svg>
    ),
    wrench: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    flame: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  };

  const fallback = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  );

  return <>{(icono && iconos[icono]) ?? fallback}</>;
}

export default async function ServiciosPage() {
  const supabase = await createSupabaseServerClient();
  const { data: servicios } = await supabase
    .from("servicios")
    .select("*")
    .eq("activo", true)
    .order("orden", { ascending: true });

  const items: Servicio[] = servicios ?? [];

  return (
    <>
      {/* ── Encabezado de sección ── */}
      <header className="py-16 bg-kaizer-surface border-b border-kaizer-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-kaizer-cyan text-sm font-semibold uppercase tracking-widest">
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

      {/* ── Grilla de servicios ── */}
      <section aria-label="Lista de servicios" className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <div
                key={s.id}
                className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface p-6 flex flex-col gap-4 hover:border-kaizer-cyan/40 transition-colors duration-200"
              >
                {/* Ícono */}
                <div className="h-11 w-11 rounded-[var(--radius-md)] bg-kaizer-cyan/10 border border-kaizer-cyan/20 flex items-center justify-center text-kaizer-cyan">
                  <IconoServicio icono={s.icono} />
                </div>

                {/* Título y descripción */}
                <div className="flex flex-col gap-2 flex-1">
                  <h2 className="font-semibold text-kaizer-white text-lg leading-snug">
                    {s.nombre}
                  </h2>
                  <p className="text-sm text-kaizer-muted leading-relaxed flex-1">
                    {s.descripcion}
                  </p>
                </div>

                {/* Etiquetas */}
                {s.etiquetas && s.etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-kaizer-border">
                    {s.etiquetas.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs bg-kaizer-cyan/10 text-kaizer-cyan border border-kaizer-cyan/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
