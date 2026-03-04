import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acerca de nosotros",
  description:
    "Conocé la historia, el equipo y los valores de Kaizer Servicios, empresa industrial en Mar del Plata.",
};

const valores = [
  {
    titulo: "Compromiso",
    desc: "Cumplimos lo que prometemos: plazos, presupuestos y estándares de calidad, sin excusas.",
    icon: "🎯",
  },
  {
    titulo: "Calidad",
    desc: "Cada intervención lleva el control y la meticulosidad que exige la industria.",
    icon: "✦",
  },
  {
    titulo: "Innovación",
    desc: "Adoptamos nuevas tecnologías y procesos para dar resultados más eficientes.",
    icon: "⚡",
  },
  {
    titulo: "Transparencia",
    desc: "Informes detallados, presupuestos claros y comunicación directa en cada etapa.",
    icon: "◇",
  },
];

// Colores rotativos para los avatares del equipo
const GRADIENTES = [
  { gradiente: "from-[#E6F9FD] to-[#B3EEF8]", acento: "text-[#00C0DE]" },
  { gradiente: "from-violet-50 to-violet-100", acento: "text-violet-500" },
  { gradiente: "from-amber-50 to-amber-100", acento: "text-amber-500" },
  { gradiente: "from-emerald-50 to-emerald-100", acento: "text-emerald-500" },
  { gradiente: "from-orange-50 to-orange-100", acento: "text-orange-500" },
  { gradiente: "from-rose-50 to-rose-100", acento: "text-rose-500" },
];

const hitos = [
  { año: "2010", titulo: "Fundación", desc: "Kaizer nace en Mar del Plata como taller de reparaciones especializadas." },
  { año: "2014", titulo: "Expansión", desc: "Se incorporan los servicios de pintura industrial y soldadura certificada." },
  { año: "2018", titulo: "Automatización", desc: "Sumamos el área de instalaciones eléctricas y automatización con PLC." },
  { año: "2024", titulo: "Hoy", desc: "Más de 200 proyectos ejecutados y presencia en toda la región." },
];

export default async function NosotrosPage() {
  const supabase = await createSupabaseServerClient();
  const { data: empleadosDB } = await supabase
    .from("empleados")
    .select("*")
    .eq("activo", true)
    .order("orden", { ascending: true });

  const equipo = (empleadosDB ?? []).map((e, i) => ({
    nombre: `${e.nombre} ${e.apellido}`,
    cargo: e.cargo,
    descripcion: e.descripcion ?? "",
    iniciales: e.iniciales,
    gradiente: GRADIENTES[i % GRADIENTES.length].gradiente,
    acento: GRADIENTES[i % GRADIENTES.length].acento,
    linkedin: e.linkedin_url ?? "#",
  }));

  return (
    <>
      {/* Header */}
      <header className="pt-16 pb-14 bg-white border-b border-[#E4EBF5] overflow-hidden relative">
        <div aria-hidden="true" className="blur-orb w-96 h-96 bg-[#00C0DE]/07 -top-20 -right-20" />
        <Container>
          <AnimatedSection>
            <span className="text-[#00C0DE] text-xs font-semibold uppercase tracking-widest">
              Quiénes somos
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0F1E] leading-tight">
              Acerca de nosotros
            </h1>
            <p className="mt-4 text-[#7A95B0] text-lg leading-relaxed max-w-xl">
              Más de una década de experiencia en servicios industriales,
              construyendo relaciones de largo plazo con nuestros clientes.
            </p>
          </AnimatedSection>
        </Container>
      </header>

      {/* Historia + Misión */}
      <section aria-label="Historia y misión" className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">
            {/* Texto */}
            <AnimatedSection direction="right">
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#0A0F1E] mb-3">Nuestra historia</h2>
                  <p className="text-[#3D5068] leading-relaxed">
                    Kaizer Servicios nació en Mar del Plata en 2010 con el objetivo de brindar
                    soluciones industriales de calidad a empresas de la región. Lo que comenzó
                    como un taller de reparaciones fue creciendo hasta convertirse en un proveedor
                    integral: hoy contamos con un equipo de técnicos especializados, herramental
                    propio y capacidad para atender proyectos de mediana y gran escala.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0A0F1E] mb-3">Nuestra misión</h2>
                  <p className="text-[#3D5068] leading-relaxed">
                    Ser el socio estratégico de confianza para empresas industriales
                    que buscan optimizar sus operaciones, reducir costos y garantizar
                    la continuidad de sus procesos productivos.
                  </p>
                </div>
                <div>
                  <CTAButton href="/contacto" variant="outline" className="self-start">
                    Contactar al equipo
                  </CTAButton>
                </div>
              </div>
            </AnimatedSection>

            {/* Timeline */}
            <AnimatedSection direction="left" delay={0.1}>
              <div className="relative flex flex-col gap-0 pl-8">
                {/* Línea vertical */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[#00C0DE] via-[#E4EBF5] to-transparent" />

                {hitos.map(({ año, titulo, desc }, i) => (
                  <div key={año} className="relative pb-8 last:pb-0">
                    {/* Punto */}
                    <div className={[
                      "absolute -left-5 w-4 h-4 rounded-full border-2 flex items-center justify-center",
                      i === hitos.length - 1
                        ? "bg-[#00C0DE] border-[#00C0DE]"
                        : "bg-white border-[#E4EBF5]",
                    ].join(" ")}>
                      {i === hitos.length - 1 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>

                    <div className="pl-4">
                      <span className="text-xs font-bold text-[#00C0DE] tracking-widest">{año}</span>
                      <h3 className="font-semibold text-[#0A0F1E] mt-0.5">{titulo}</h3>
                      <p className="text-sm text-[#7A95B0] mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Valores */}
      <section aria-label="Nuestros valores" className="py-16 bg-[#F6F9FC] border-y border-[#E4EBF5]">
        <Container>
          <AnimatedSection className="text-center mb-10">
            <p className="text-[#00C0DE] text-xs font-semibold uppercase tracking-widest mb-2">Los pilares de Kaizer</p>
            <h2 className="text-2xl font-bold text-[#0A0F1E]">Nuestros valores</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map(({ titulo, desc, icon }, i) => (
              <AnimatedSection key={titulo} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-[#E4EBF5] bg-white p-6 hover:border-[#00C0DE]/25 hover:shadow-[0_4px_16px_rgba(10,15,30,0.06)] transition-all duration-300 group">
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">
                    {icon}
                  </div>
                  <div className="h-0.5 w-8 bg-[#00C0DE] rounded-full mb-3" />
                  <h3 className="font-semibold text-[#0A0F1E] mb-1.5">{titulo}</h3>
                  <p className="text-sm text-[#7A95B0] leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Equipo */}
      <section aria-label="Nuestro equipo" className="py-20 bg-white">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#00C0DE] text-xs font-semibold uppercase tracking-widest mb-2">Las personas detrás</p>
            <h2 className="text-2xl font-bold text-[#0A0F1E]">El equipo</h2>
            <p className="mt-2 text-[#7A95B0] max-w-xl mx-auto leading-relaxed">
              Profesionales comprometidos con la excelencia técnica y el servicio al cliente.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {equipo.map((e, i) => (
              <AnimatedSection key={e.nombre} delay={i * 0.07}>
                <div className="group h-full rounded-2xl border border-[#E4EBF5] bg-white p-6 flex flex-col items-center text-center gap-4 hover:border-[#00C0DE]/25 hover:shadow-[0_6px_24px_rgba(10,15,30,0.07)] transition-all duration-300">
                  {/* Avatar */}
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${e.gradiente} flex items-center justify-center font-bold text-lg ${e.acento} group-hover:scale-105 transition-transform duration-200`}>
                    {e.iniciales}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-[#0A0F1E]">{e.nombre}</p>
                    <p className="text-xs text-[#00C0DE] font-medium">{e.cargo}</p>
                  </div>

                  <p className="text-sm text-[#7A95B0] leading-relaxed flex-1">
                    {e.descripcion}
                  </p>

                  {/* LinkedIn */}
                  <a
                    href={e.linkedin}
                    aria-label={`LinkedIn de ${e.nombre}`}
                    className="mt-auto flex items-center gap-1.5 text-xs text-[#7A95B0] hover:text-[#00C0DE] transition-colors duration-150 group/li"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
