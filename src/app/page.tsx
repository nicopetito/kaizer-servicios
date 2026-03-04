import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CounterAnimation from "@/components/ui/CounterAnimation";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title:       SITE_NAME,
  description: SITE_DESCRIPTION,
};

const stats = [
  { value: "+10",  label: "Años de experiencia" },
  { value: "+200", label: "Proyectos ejecutados" },
  { value: "100%", label: "Compromisos cumplidos" },
  { value: "24/7", label: "Soporte técnico" },
];

const serviciosPreview = [
  {
    titulo: "Mantenimiento Preventivo",
    descripcion: "Planes a medida que prolongan la vida útil de tus equipos y eliminan paradas no planificadas.",
    imagen: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80&auto=format&fit=crop",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    titulo: "Instalación Eléctrica",
    descripcion: "Tableros, automatización y habilitaciones bajo normativa eléctrica industrial vigente.",
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    titulo: "Soldadura Industrial",
    descripcion: "MIG/MAG, TIG y electrodo en acero, inoxidable y aluminio. Fabricación y reparación en campo.",
    imagen: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=700&q=80&auto=format&fit=crop",
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — Full screen con imagen de fondo
      ═══════════════════════════════════════════ */}
      <section
        aria-label="Sección principal"
        className="relative flex flex-col min-h-dvh -mt-16 overflow-hidden"
      >
        {/* ── Imagen de fondo ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* ── Overlays de opacidad en capas ── */}
        {/* Capa base oscura uniforme */}
        <div className="absolute inset-0 bg-[#07090E]/55" />
        {/* Gradiente de profundidad: más oscuro abajo para las stats */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07090E]/10 to-[#07090E]/70" />
        {/* Gradiente superior para legibilidad del navbar */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#07090E]/70 to-transparent" />
        {/* Tinte cyan sutil desde arriba izquierda */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C0DE]/06 via-transparent to-transparent" />

        {/* ── Contenido central ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
          <Container>
            <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">

              {/* Badge */}
              <AnimatedSection delay={0.04}>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white/90 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C0DE] animate-pulse" />
                  Mar del Plata · Servicios Industriales
                </span>
              </AnimatedSection>

              {/* Headline */}
              <AnimatedSection delay={0.10}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.06] tracking-tight">
                  Soluciones industriales{" "}
                  <br className="hidden sm:block" />
                  <span className="text-[#00C0DE]">a medida</span>{" "}
                  para tu empresa.
                </h1>
              </AnimatedSection>

              {/* Descripción */}
              <AnimatedSection delay={0.17}>
                <p className="text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed">
                  Somos el socio estratégico que tu empresa necesita para
                  optimizar procesos, mantener equipos y ejecutar proyectos
                  con la máxima eficiencia y calidad.
                </p>
              </AnimatedSection>

              {/* CTAs */}
              <AnimatedSection delay={0.23}>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                  <CTAButton href="/contacto" size="lg">
                    Solicitar presupuesto
                  </CTAButton>
                  {/* Botón outline con blur para fondo oscuro */}
                  <a
                    href="/servicios"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white font-semibold px-8 py-3 text-base bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/50 transition-all duration-200 active:scale-[0.98]"
                  >
                    Ver servicios
                  </a>
                </div>
              </AnimatedSection>

              {/* Trust row */}
              <AnimatedSection delay={0.29}>
                <div className="flex flex-wrap items-center justify-center gap-5 mt-1">
                  {["Presupuesto sin cargo", "+10 años de trayectoria", "Respuesta en 24h"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-xs text-white/55">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3 text-[#00C0DE] flex-shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>
              </AnimatedSection>

            </div>
          </Container>
        </div>

        {/* ── Stats bar — fijada al fondo del hero ── */}
        <AnimatedSection delay={0.35} className="relative z-10 pb-8 px-4">
          <Container>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-white/10">
              {stats.map(({ value, label }, i) => (
                <div key={label} className={`flex flex-col items-center text-center gap-1 ${i > 0 ? "pl-6" : ""}`}>
                  <dt className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                    <CounterAnimation value={value} />
                  </dt>
                  <dd className="text-xs text-white/55 leading-snug">{label}</dd>
                </div>
              ))}
            </div>
          </Container>
        </AnimatedSection>

      </section>

      {/* ═══════════════════════════════════════════
          SERVICIOS PREVIEW
      ═══════════════════════════════════════════ */}
      <section aria-label="Servicios destacados" className="py-20 bg-white">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#00C0DE] text-xs font-semibold uppercase tracking-widest mb-3">
              Lo que hacemos
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0F1E] leading-tight">
              Servicios industriales integrales
            </h2>
            <p className="mt-3 text-[#7A95B0] max-w-xl mx-auto leading-relaxed">
              Desde el mantenimiento preventivo hasta la instalación completa
              de sistemas industriales. Todo bajo el mismo techo.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {serviciosPreview.map(({ titulo, descripcion, icono, imagen }, i) => (
              <AnimatedSection key={titulo} delay={i * 0.1}>
                <a
                  href="/servicios"
                  className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer h-80 shadow-[0_2px_12px_rgba(10,15,30,0.08)] hover:shadow-[0_12px_40px_rgba(10,15,30,0.18)] transition-shadow duration-500"
                >
                  {/* ── Imagen full card con zoom en hover ── */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagen}
                    alt={titulo}
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* ── Gradiente: transparente arriba → oscuro abajo ── */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/95 via-[#07090E]/45 to-[#07090E]/10" />

                  {/* ── Línea cyan superior que aparece en hover ── */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-[#00C0DE] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                  {/* ── Ícono — arriba izquierda ── */}
                  <div className="absolute top-5 left-5 h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#00C0DE] group-hover:border-[#00C0DE] transition-all duration-300">
                    {icono}
                  </div>

                  {/* ── Contenido — fijado al fondo ── */}
                  <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-2">
                    <h3 className="font-bold text-white text-xl leading-snug">{titulo}</h3>

                    {/* Descripción: oculta, sube en hover */}
                    <p className="text-white/70 text-sm leading-relaxed overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out">
                      {descripcion}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-[#00C0DE] text-sm font-semibold mt-1 translate-y-1 group-hover:translate-y-0 opacity-60 group-hover:opacity-100 transition-all duration-300">
                      Ver detalle
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} className="text-center mt-8">
            <CTAButton href="/servicios" variant="ghost">
              Ver todos los servicios →
            </CTAButton>
          </AnimatedSection>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          POR QUÉ ELEGIRNOS
      ═══════════════════════════════════════════ */}
      <section aria-label="Por qué elegirnos" className="py-20 bg-[#F6F9FC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <p className="text-[#00C0DE] text-xs font-semibold uppercase tracking-widest mb-3">
                Por qué Kaizer
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0F1E] leading-tight mb-5">
                Más de una década resolviendo desafíos industriales
              </h2>
              <p className="text-[#3D5068] leading-relaxed mb-6">
                Desde 2010, acompañamos a empresas de Mar del Plata y la región
                con soluciones técnicas que reducen costos, mejoran la eficiencia
                y garantizan la continuidad operativa.
              </p>
              <CTAButton href="/nosotros" variant="outline">
                Conocer nuestra historia
              </CTAButton>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "🎯", title: "Compromiso real", desc: "Cumplimos plazos y presupuestos acordados, sin sorpresas." },
                { emoji: "⚡", title: "Respuesta rápida", desc: "Asistencia técnica dentro de las 24h en toda la región." },
                { emoji: "🔧", title: "Equipo certificado", desc: "Técnicos especializados con certificaciones de la industria." },
                { emoji: "📋", title: "Transparencia total", desc: "Informes detallados y comunicación directa en cada etapa." },
              ].map(({ emoji, title, desc }, i) => (
                <AnimatedSection key={title} delay={0.1 + i * 0.08}>
                  <div className="rounded-2xl bg-white border border-[#E4EBF5] p-5 hover:border-[#00C0DE]/25 hover:shadow-[0_4px_16px_rgba(10,15,30,0.06)] transition-all duration-300">
                    <span className="text-2xl block mb-2">{emoji}</span>
                    <h3 className="font-semibold text-[#0A0F1E] text-sm mb-1">{title}</h3>
                    <p className="text-xs text-[#7A95B0] leading-relaxed">{desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          CTA FINAL — Split card editorial
      ═══════════════════════════════════════════ */}
      <section aria-label="Llamada a la acción" className="py-20 bg-white">
        <Container>
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden bg-[#0A0F1E] min-h-[380px] flex flex-col lg:flex-row">

              {/* ── Imagen de fondo difuminada solo en mobile ── */}
              <div className="absolute inset-0 lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581093196277-8b74799c4735?w=900&q=85&auto=format&fit=crop"
                  alt="" aria-hidden="true"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-[#0A0F1E]/80" />
              </div>

              {/* ── Glow cyan sutil ── */}
              <div
                aria-hidden="true"
                className="absolute pointer-events-none rounded-full bg-[#00C0DE]"
                style={{ width: 400, height: 400, opacity: 0.08, filter: "blur(90px)", top: "-80px", left: "-60px" }}
              />

              {/* ── Contenido izquierdo ── */}
              <div className="relative z-10 flex flex-col justify-center gap-6 p-10 sm:p-14 lg:w-[55%]">

                {/* Badge */}
                <span className="inline-flex items-center gap-2 w-fit rounded-full bg-[#00C0DE]/15 border border-[#00C0DE]/25 px-4 py-1.5 text-xs font-semibold text-[#00C0DE] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C0DE] animate-pulse" />
                  Trabajemos juntos
                </span>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-[1.1] tracking-tight">
                  ¿Tenés un proyecto<br className="hidden sm:block" /> en mente?
                </h2>

                {/* Descripción */}
                <p className="text-white/55 leading-relaxed max-w-md">
                  Contanos qué necesitás y te preparamos un presupuesto
                  detallado sin cargo y sin compromiso.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <CTAButton href="/contacto" size="lg">
                    Hablar con nosotros
                  </CTAButton>
                  <a
                    href="/catalogo"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white/70 font-semibold px-7 py-3 text-sm hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-200 active:scale-[0.98]"
                  >
                    Ver catálogo
                  </a>
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap gap-5 pt-1 border-t border-white/8">
                  {[
                    { icon: "✓", text: "Presupuesto sin cargo" },
                    { icon: "✓", text: "Respuesta en 24h" },
                    { icon: "✓", text: "+200 proyectos entregados" },
                  ].map(({ icon, text }) => (
                    <span key={text} className="flex items-center gap-1.5 text-xs text-white/45">
                      <span className="text-[#00C0DE] font-bold">{icon}</span>
                      {text}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Columna derecha: imagen full ── */}
              <div className="relative hidden lg:block flex-1 min-h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=85&auto=format&fit=crop"
                  alt="Equipo técnico Kaizer Servicios"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Fade desde la izquierda para fusionar suavemente con el fondo oscuro */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E] via-[#0A0F1E]/30 to-transparent" />
                {/* Vignette sutil en bordes */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/50 to-transparent" />
              </div>

            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
