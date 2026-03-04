import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { createSupabaseServerClient } from "@/lib/supabase-server";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("articulos")
    .select("titulo, extracto")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();

  if (!data) return { title: "Artículo no encontrado" };

  return {
    title: data.titulo,
    description: data.extracto ?? undefined,
  };
}

function formatFecha(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: articulo } = await supabase
    .from("articulos")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();

  if (!articulo) notFound();

  return (
    <>
      {/* ── Hero del artículo ── */}
      {articulo.imagen_url && (
        <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={articulo.imagen_url}
            alt={articulo.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
        </div>
      )}

      <article className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-kaizer-muted mb-8">
              <Link href="/blog" className="hover:text-kaizer-cyan transition-colors">
                Blog
              </Link>
              <span>/</span>
              {articulo.categoria && (
                <>
                  <span className="text-kaizer-light">{articulo.categoria}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-kaizer-white line-clamp-1">{articulo.titulo}</span>
            </nav>

            {/* Categoría */}
            {articulo.categoria && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-kaizer-cyan/10 text-kaizer-cyan border border-kaizer-cyan/20 mb-4">
                {articulo.categoria}
              </span>
            )}

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl font-bold text-kaizer-white leading-tight mb-4">
              {articulo.titulo}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-kaizer-muted mb-8 pb-8 border-b border-kaizer-border">
              {articulo.autor && (
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {articulo.autor}
                </span>
              )}
              {articulo.fecha_publicacion && (
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {formatFecha(articulo.fecha_publicacion)}
                </span>
              )}
              {articulo.tiempo_lectura && (
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {articulo.tiempo_lectura} min de lectura
                </span>
              )}
            </div>

            {/* Extracto */}
            {articulo.extracto && (
              <p className="text-lg text-kaizer-light leading-relaxed mb-8 font-medium">
                {articulo.extracto}
              </p>
            )}

            {/* Contenido (HTML de Tiptap) */}
            {articulo.contenido ? (
              <div
                className="prose prose-slate max-w-none prose-headings:text-kaizer-white prose-p:text-kaizer-light prose-a:text-kaizer-cyan prose-strong:text-kaizer-white prose-li:text-kaizer-light"
                dangerouslySetInnerHTML={{ __html: articulo.contenido }}
              />
            ) : (
              <p className="text-kaizer-muted italic">
                El contenido de este artículo aún no está disponible.
              </p>
            )}

            {/* Tags */}
            {articulo.tags && articulo.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-kaizer-border">
                <p className="text-sm text-kaizer-muted mb-3">Etiquetas:</p>
                <div className="flex flex-wrap gap-2">
                  {articulo.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1 rounded-full text-xs border border-kaizer-border text-kaizer-muted hover:border-kaizer-cyan/50 hover:text-kaizer-cyan transition-colors duration-150"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Volver */}
            <div className="mt-12 pt-8 border-t border-kaizer-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-kaizer-cyan hover:text-kaizer-cyan-dark transition-colors text-sm font-medium"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver al blog
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
