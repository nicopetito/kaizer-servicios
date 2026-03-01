import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title:       "Blog",
  description: "Artículos, novedades y noticias del sector industrial. Blog de Kaizer Servicios.",
};

export default function BlogPage() {
  return (
    <>
      {/* ── Encabezado ── */}
      <header className="py-16 bg-kaizer-surface border-b border-kaizer-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-kaizer-blue text-sm font-semibold uppercase tracking-widest">
              Contenido & Novedades
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-kaizer-white leading-tight">
              Blog
            </h1>
            <p className="mt-4 text-kaizer-muted text-lg leading-relaxed">
              Artículos técnicos, novedades del sector industrial y consejos
              prácticos del equipo de Kaizer Servicios.
            </p>
          </div>
        </Container>
      </header>

      {/* ── Grid de artículos (placeholder) ── */}
      <section aria-label="Artículos del blog" className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface overflow-hidden flex flex-col group cursor-pointer hover:border-kaizer-blue/30 transition-colors duration-200"
              >
                {/* Imagen placeholder */}
                <div className="aspect-video bg-kaizer-border/30" />
                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Categoría */}
                  <div className="h-3 w-1/4 rounded-full bg-kaizer-blue/30" />
                  {/* Título */}
                  <div className="space-y-1.5">
                    <div className="h-4 w-full rounded bg-kaizer-border" />
                    <div className="h-4 w-4/5 rounded bg-kaizer-border" />
                  </div>
                  {/* Extracto */}
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-full rounded bg-kaizer-border/60" />
                    <div className="h-3 w-full rounded bg-kaizer-border/60" />
                    <div className="h-3 w-2/3 rounded bg-kaizer-border/60" />
                  </div>
                  {/* Meta */}
                  <div className="flex items-center justify-between pt-2 border-t border-kaizer-border">
                    <div className="h-3 w-1/3 rounded bg-kaizer-border/60" />
                    <div className="h-3 w-1/4 rounded bg-kaizer-border/60" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
