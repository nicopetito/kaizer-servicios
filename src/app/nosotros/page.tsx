import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Acerca de nosotros",
  description:
    "Conocé la historia, el equipo y los valores de Kaizer Servicios, empresa industrial en Mar del Plata.",
};

const valores = [
  {
    titulo: "Compromiso",
    desc: "Cumplimos lo que prometemos: plazos, presupuestos y estándares de calidad, sin excusas.",
  },
  {
    titulo: "Calidad",
    desc: "Cada intervención lleva el control y la meticulosidad que exige la industria.",
  },
  {
    titulo: "Innovación",
    desc: "Adoptamos nuevas tecnologías y procesos para dar resultados más eficientes a nuestros clientes.",
  },
  {
    titulo: "Transparencia",
    desc: "Informes detallados, presupuestos claros y comunicación directa en cada etapa del trabajo.",
  },
];

const equipo = [
  {
    nombre: "Carlos Rodríguez",
    cargo: "Director General",
    descripcion:
      "Más de 15 años en el sector industrial. Fundó Kaizer con la visión de combinar servicio personalizado y tecnología de punta.",
    iniciales: "CR",
    color: "bg-kaizer-cyan/20 text-kaizer-cyan border-kaizer-cyan/30",
    linkedin: "#",
  },
  {
    nombre: "Laura Martínez",
    cargo: "Gerente de Operaciones",
    descripcion:
      "Ingeniera Industrial (UTN Mar del Plata). Coordina los proyectos de campo y garantiza que cada entrega cumpla los tiempos pactados.",
    iniciales: "LM",
    color: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    linkedin: "#",
  },
  {
    nombre: "Marcos Fernández",
    cargo: "Jefe Técnico",
    descripcion:
      "Electromecánico con especialización en automatización industrial. Referente del equipo para diagnósticos complejos y puestas en marcha.",
    iniciales: "MF",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    linkedin: "#",
  },
  {
    nombre: "Valeria Sosa",
    cargo: "Administración y Finanzas",
    descripcion:
      "Contadora Pública. Gestiona presupuestos, facturación y el cumplimiento de las obligaciones fiscales de la empresa.",
    iniciales: "VS",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    linkedin: "#",
  },
  {
    nombre: "Diego Peralta",
    cargo: "Técnico Senior – Soldadura",
    descripcion:
      "Soldador certificado con más de 10 años de experiencia en estructuras industriales, MIG/MAG y TIG sobre acero inoxidable y aluminio.",
    iniciales: "DP",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    linkedin: "#",
  },
  {
    nombre: "Florencia Ruiz",
    cargo: "Atención al Cliente",
    descripcion:
      "Analista comercial. Primera línea de contacto con clientes, coordina solicitudes de presupuesto y seguimiento de proyectos.",
    iniciales: "FR",
    color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    linkedin: "#",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* ── Encabezado ── */}
      <header className="py-16 bg-kaizer-surface border-b border-kaizer-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-kaizer-cyan text-sm font-semibold uppercase tracking-widest">
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

      {/* ── Historia / Misión / Valores ── */}
      <section aria-label="Historia y misión" className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Texto */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold text-kaizer-white mb-3">Nuestra historia</h2>
                <p className="text-kaizer-muted leading-relaxed">
                  Kaizer Servicios nació en Mar del Plata en 2010 con el objetivo de brindar
                  soluciones industriales de calidad a empresas de la región. Lo que comenzó
                  como un taller de reparaciones fue creciendo hasta convertirse en un proveedor
                  integral: hoy contamos con un equipo de técnicos especializados, herramental
                  propio y capacidad para atender proyectos de mediana y gran escala.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-kaizer-white mb-3">Nuestra misión</h2>
                <p className="text-kaizer-muted leading-relaxed">
                  Ser el socio estratégico de confianza para empresas industriales
                  que buscan optimizar sus operaciones, reducir costos y garantizar
                  la continuidad de sus procesos productivos. Trabajamos codo a codo
                  con cada cliente para encontrar la solución más eficiente.
                </p>
              </div>
              <CTAButton href="/contacto" variant="outline" className="self-start">
                Contactar al equipo
              </CTAButton>
            </div>

            {/* Valores */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {valores.map(({ titulo, desc }) => (
                <div
                  key={titulo}
                  className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface p-5 hover:border-kaizer-cyan/30 transition-colors duration-200"
                >
                  <div className="h-1 w-8 bg-kaizer-cyan rounded-full mb-3" />
                  <h3 className="font-semibold text-kaizer-white mb-1">{titulo}</h3>
                  <p className="text-sm text-kaizer-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Equipo ── */}
      <section
        aria-label="Nuestro equipo"
        className="py-16 bg-kaizer-surface border-t border-kaizer-border"
      >
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-kaizer-white">El equipo</h2>
            <p className="mt-2 text-kaizer-muted max-w-xl mx-auto">
              Profesionales comprometidos con la excelencia técnica y el servicio al cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipo.map((e) => (
              <div
                key={e.nombre}
                className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-dark p-6 flex flex-col items-center text-center gap-4 hover:border-kaizer-cyan/30 transition-colors duration-200"
              >
                {/* Avatar con iniciales */}
                <div
                  className={`h-16 w-16 rounded-full border-2 flex items-center justify-center font-bold text-lg ${e.color}`}
                >
                  {e.iniciales}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-kaizer-white">{e.nombre}</p>
                  <p className="text-xs text-kaizer-cyan font-medium">{e.cargo}</p>
                </div>

                <p className="text-sm text-kaizer-muted leading-relaxed">
                  {e.descripcion}
                </p>

                {/* LinkedIn */}
                <a
                  href={e.linkedin}
                  aria-label={`LinkedIn de ${e.nombre}`}
                  className="mt-auto text-kaizer-muted hover:text-kaizer-cyan transition-colors duration-150"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
