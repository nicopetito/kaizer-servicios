import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const dynamic = "force-dynamic";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogContent, { type Articulo } from "@/components/ui/BlogContent";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos, novedades y noticias del sector industrial. Blog de Kaizer Servicios.",
};

function formatFecha(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("articulos")
    .select("*")
    .eq("publicado", true)
    .order("fecha_publicacion", { ascending: false });

  const articulos: Articulo[] = (data ?? []).map((a) => ({
    id: a.id,
    slug: a.slug,
    titulo: a.titulo,
    extracto: a.extracto ?? "",
    categoria: a.categoria ?? "General",
    autor: a.autor ?? "Kaizer Servicios",
    fecha: formatFecha(a.fecha_publicacion),
    tiempoLectura: a.tiempo_lectura ?? 5,
    imagen: a.imagen_url ?? "https://picsum.photos/seed/default/800/450",
    tags: a.tags ?? [],
  }));

  return (
    <>
      {/* Encabezado */}
      <header className="pt-16 pb-14 bg-white border-b border-[#E4EBF5] overflow-hidden relative">
        <div aria-hidden="true" className="blur-orb w-80 h-80 bg-[#00C0DE]/08 -top-16 -right-16" />
        <Container>
          <AnimatedSection>
            <span className="text-[#00C0DE] text-xs font-semibold uppercase tracking-widest">
              Contenido & Novedades
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0F1E] leading-tight">
              Blog
            </h1>
            <p className="mt-4 text-[#7A95B0] text-lg leading-relaxed max-w-xl">
              Artículos técnicos, novedades del sector industrial y consejos
              prácticos del equipo de Kaizer Servicios.
            </p>
          </AnimatedSection>
        </Container>
      </header>

      {/* Contenido con artículos + sidebar */}
      <BlogContent articulos={articulos} />
    </>
  );
}
