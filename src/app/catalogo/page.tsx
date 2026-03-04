import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import CatalogoGrid, { type Producto } from "@/components/ui/CatalogoGrid";

export const metadata: Metadata = {
  title: "Catálogo de Productos",
  description:
    "Explorá nuestro catálogo de productos y equipos industriales disponibles en Kaizer Servicios.",
};

const productos: Producto[] = [
  {
    id: 1,
    nombre: "Compresor de Aire 500 L",
    descripcion:
      "Compresor de pistón de doble etapa con calderín de 500 litros. Ideal para cabinas de pintura y talleres de alta demanda.",
    precio: 1_850_000,
    material: "Acero con recubrimiento epoxi",
    marca: "Schulz",
    categoria: "Equipos",
    imagen: "https://picsum.photos/seed/compressor-air/400/400",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Soldadora MIG/MAG 250 A",
    descripcion:
      "Soldadora inverter multifunción con alimentador de hilo integrado. Apta para acero, inoxidable y aluminio.",
    precio: 620_000,
    material: "Chasis de acero con frontal de aluminio",
    marca: "Lincoln Electric",
    categoria: "Equipos",
    imagen: "https://picsum.photos/seed/welder-mig/400/400",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Amoladora Angular 9\"",
    descripcion:
      "Amoladora de gran formato para corte y desbaste de metales. Motor de 2.400 W, 6.500 RPM. Incluye protector ajustable.",
    precio: 95_000,
    material: "Aleación de aluminio y policarbonato",
    marca: "DeWalt",
    categoria: "Herramientas",
    imagen: "https://picsum.photos/seed/angle-grinder/400/400",
    disponible: true,
  },
  {
    id: 4,
    nombre: "Taladro Percutor 1.050 W",
    descripcion:
      "Taladro de impacto con mandril de 13 mm. Velocidad variable, reversa y función percusión. Ideal para mampostería y metal.",
    precio: 58_000,
    material: "Policarbonato reforzado con fibra de vidrio",
    marca: "Bosch",
    categoria: "Herramientas",
    imagen: "https://picsum.photos/seed/drill-bosch/400/400",
    disponible: true,
  },
  {
    id: 5,
    nombre: "Generador Diesel 7,5 kVA",
    descripcion:
      "Grupo electrógeno monofásico silencioso. Autonomía de 8 hs a plena carga. Arranque eléctrico y panel de control digital.",
    precio: 980_000,
    material: "Estructura de acero tratado anticorrosión",
    marca: "Mpower",
    categoria: "Equipos",
    imagen: "https://picsum.photos/seed/diesel-generator/400/400",
    disponible: true,
  },
  {
    id: 6,
    nombre: "Kit Pintura Airless Profesional",
    descripcion:
      "Equipo de pulverización airless con pistola, manguera de 15 m y filtro de línea. Presión de trabajo hasta 210 bar.",
    precio: 340_000,
    material: "Polipropileno y acero inoxidable",
    marca: "Graco",
    categoria: "Insumos",
    imagen: "https://picsum.photos/seed/airless-paint/400/400",
    disponible: true,
  },
  {
    id: 7,
    nombre: "Esmeril de Banco 6\"",
    descripcion:
      "Esmeril doble con muela de óxido de aluminio y muela de cepillo de alambre. Motor 370 W, base de hierro fundido antivibración.",
    precio: 42_000,
    material: "Hierro fundido y acero",
    marca: "Black & Decker",
    categoria: "Herramientas",
    imagen: "https://picsum.photos/seed/bench-grinder/400/400",
    disponible: true,
  },
  {
    id: 8,
    nombre: "Cortadora de Plasma 40 A",
    descripcion:
      "Máquina de corte por plasma inverter. Corta acero hasta 12 mm, aluminio hasta 8 mm. Con antorcha HF y regulador de presión.",
    precio: 285_000,
    material: "Aluminio anodizado y ABS de alta resistencia",
    marca: "Yeswelder",
    categoria: "Equipos",
    imagen: "https://picsum.photos/seed/plasma-cutter/400/400",
    disponible: true,
  },
  {
    id: 9,
    nombre: "Kit Discos de Corte (25 u.)",
    descripcion:
      "Pack de discos de corte para amoladora 115 mm. Apto para acero inoxidable y hierro. Vida útil extendida.",
    precio: 12_500,
    material: "Corindón con malla de fibra de vidrio",
    marca: "Norton",
    categoria: "Insumos",
    imagen: "https://picsum.photos/seed/cutting-discs/400/400",
    disponible: true,
  },
  {
    id: 10,
    nombre: "Rodamiento SKF 6205 (x10)",
    descripcion:
      "Rodamientos de bolas de una hilera, sellados. Dimensiones 25×52×15 mm. Apto para motores eléctricos, bombas y reductores.",
    precio: 18_000,
    material: "Acero cromo-níquel con jaula de poliamida",
    marca: "SKF",
    categoria: "Repuestos",
    imagen: "https://picsum.photos/seed/bearing-skf/400/400",
    disponible: true,
  },
  {
    id: 11,
    nombre: "Junta Plana Universal 1 m²",
    descripcion:
      "Plancha de juntas de fibra prensada resistente a aceites, combustibles y vapor. Temperatura máx. 350 °C.",
    precio: 9_800,
    material: "Fibra prensada con aglutinante NBR",
    marca: "Klinger",
    categoria: "Repuestos",
    imagen: "https://picsum.photos/seed/gasket-sheet/400/400",
    disponible: true,
  },
  {
    id: 12,
    nombre: "Taladro de Columna 16 mm",
    descripcion:
      "Taladro de banco con 5 velocidades de husillo (180–2.850 RPM) y mesa inclinable ±45°. Profundidad de taladrado 100 mm.",
    precio: 165_000,
    material: "Hierro fundido y acero inoxidable",
    marca: "Metabo",
    categoria: "Herramientas",
    imagen: "https://picsum.photos/seed/column-drill/400/400",
    disponible: false,
  },
];

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
              Explorá nuestro catálogo de productos y equipos industriales.
              Calidad garantizada y disponibilidad inmediata en la mayoría de los ítems.
            </p>
          </div>
        </Container>
      </header>

      {/* ── Grid interactivo con filtros (client component) ── */}
      <CatalogoGrid productos={productos} />

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
