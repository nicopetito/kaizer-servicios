import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import BlogContent, { type Articulo } from "@/components/ui/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos, novedades y noticias del sector industrial. Blog de Kaizer Servicios.",
};

const articulos: Articulo[] = [
  {
    id: 1,
    titulo: "Mantenimiento preventivo: cómo reducir costos en tu planta",
    extracto:
      "Un plan de mantenimiento bien diseñado puede reducir hasta un 30 % los costos operativos y eliminar paradas inesperadas que frenan la producción. Te explicamos cómo implementarlo paso a paso.",
    categoria: "Mantenimiento",
    autor: "Marcos Fernández",
    fecha: "12 feb 2025",
    tiempoLectura: 8,
    imagen: "https://picsum.photos/seed/maintenance-plant/800/450",
    tags: ["mantenimiento", "costos", "producción", "industria"],
  },
  {
    id: 2,
    titulo: "Guía completa para elegir un compresor de aire industrial",
    extracto:
      "Caudal, presión de trabajo, capacidad del calderín y tipo de lubricación: conocé todos los parámetros que debés evaluar antes de invertir en un compresor para tu empresa.",
    categoria: "Equipos",
    autor: "Diego Peralta",
    fecha: "28 ene 2025",
    tiempoLectura: 12,
    imagen: "https://picsum.photos/seed/industrial-compressor/800/450",
    tags: ["compresor", "equipos", "industria", "aire comprimido"],
  },
  {
    id: 3,
    titulo: "Pintura industrial: técnicas y materiales para ambientes agresivos",
    extracto:
      "La selección del sistema de pintura correcto marca la diferencia entre una protección que dura dos años y una que aguanta más de diez. Repasamos las opciones más usadas en la industria local.",
    categoria: "Pintura",
    autor: "Carlos Rodríguez",
    fecha: "15 ene 2025",
    tiempoLectura: 6,
    imagen: "https://picsum.photos/seed/industrial-painting/800/450",
    tags: ["pintura", "anticorrosión", "epoxi", "estructuras"],
  },
  {
    id: 4,
    titulo: "Puesta en marcha de maquinaria: los 5 pasos clave",
    extracto:
      "Instalar maquinaria nueva va mucho más allá de conectar cables y encender. Te contamos el protocolo que seguimos en Kaizer para garantizar que cada equipo arranque sin problemas.",
    categoria: "Operaciones",
    autor: "Laura Martínez",
    fecha: "3 ene 2025",
    tiempoLectura: 7,
    imagen: "https://picsum.photos/seed/machine-startup/800/450",
    tags: ["puesta en marcha", "maquinaria", "industria", "instalación"],
  },
  {
    id: 5,
    titulo: "Soldadura TIG vs MIG: ¿cuál es mejor para tu proyecto?",
    extracto:
      "Ambos procesos tienen ventajas y contextos de aplicación muy diferentes. Comparamos velocidad, precisión, costo de operación y materiales compatibles para ayudarte a tomar la mejor decisión.",
    categoria: "Soldadura",
    autor: "Diego Peralta",
    fecha: "18 dic 2024",
    tiempoLectura: 9,
    imagen: "https://picsum.photos/seed/tig-mig-welding/800/450",
    tags: ["soldadura", "TIG", "MIG", "metales"],
  },
  {
    id: 6,
    titulo: "Seguridad eléctrica en plantas industriales: normativa 2024",
    extracto:
      "Las resoluciones de la AEA y el reglamento de la Ley 19.587 establecen requisitos concretos para instalaciones eléctricas industriales. Repasamos los puntos críticos que toda empresa debe cumplir.",
    categoria: "Normativa",
    autor: "Valeria Sosa",
    fecha: "5 dic 2024",
    tiempoLectura: 10,
    imagen: "https://picsum.photos/seed/electrical-safety/800/450",
    tags: ["seguridad", "normativa", "electricidad", "AEA"],
  },
];

export default function BlogPage() {
  return (
    <>
      {/* ── Encabezado ── */}
      <header className="py-16 bg-kaizer-surface border-b border-kaizer-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-kaizer-cyan text-sm font-semibold uppercase tracking-widest">
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

      {/* ── Layout: artículos + sidebar ── */}
      <BlogContent articulos={articulos} />
    </>
  );
}
