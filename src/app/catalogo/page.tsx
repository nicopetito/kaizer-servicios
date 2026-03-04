import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const dynamic = "force-dynamic";
import CTAButton from "@/components/ui/CTAButton";
import CatalogoGrid, { type ProductoUI } from "@/components/ui/CatalogoGrid";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Catálogo de Productos",
  description:
    "Explorá nuestro catálogo de productos y equipos industriales disponibles en Kaizer Servicios.",
};

export default async function CatalogoPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: productosDB }, { data: categoriasDB }] = await Promise.all([
    supabase
      .from("productos")
      .select("*, categorias_producto(nombre)")
      .eq("disponible", true)
      .order("orden", { ascending: true }),
    supabase
      .from("categorias_producto")
      .select("*")
      .order("nombre", { ascending: true }),
  ]);

  const productos: ProductoUI[] = (productosDB ?? []).map((p) => ({
    id: p.id,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: p.precio,
    material: p.material,
    marca: p.marca,
    categoria: p.categorias_producto?.nombre ?? "Sin categoría",
    imagen: p.imagen_url,
    disponible: p.disponible,
  }));

  const categorias: string[] = (categoriasDB ?? []).map((c) => c.nombre);

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
              Explorá nuestro catálogo de productos y equipos industriales.
              Calidad garantizada y disponibilidad inmediata en la mayoría de los ítems.
            </p>
          </div>
        </Container>
      </header>

      {/* ── Grid interactivo con filtros (client component) ── */}
      <CatalogoGrid productos={productos} categorias={categorias} />

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
