"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Toast from "@/components/ui/Toast";
import { CONTACT_INFO } from "@/lib/constants";

function FloatingInput({
  id,
  name,
  type = "text",
  label,
  required = false,
  placeholder = " ",
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="peer w-full rounded-2xl border border-[#E4EBF5] bg-[#F6F9FC] px-4 pt-6 pb-2.5 text-sm text-[#0A0F1E] placeholder-transparent focus:outline-none focus:border-[#00C0DE] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,192,222,0.08)] transition-all duration-200"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-sm text-[#7A95B0] transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#00C0DE] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
      >
        {label}{required && <span className="text-[#00C0DE] ml-0.5">*</span>}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  name,
  label,
  required = false,
  rows = 5,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        placeholder=" "
        className="peer w-full rounded-2xl border border-[#E4EBF5] bg-[#F6F9FC] px-4 pt-7 pb-3 text-sm text-[#0A0F1E] placeholder-transparent focus:outline-none focus:border-[#00C0DE] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,192,222,0.08)] transition-all duration-200 resize-none"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-sm text-[#7A95B0] transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#00C0DE] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
      >
        {label}{required && <span className="text-[#00C0DE] ml-0.5">*</span>}
      </label>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#E4EBF5] hover:border-[#00C0DE]/25 hover:shadow-[0_4px_16px_rgba(10,15,30,0.06)] transition-all duration-200">
      <div className="w-9 h-9 rounded-xl bg-[#E6F9FD] flex items-center justify-center text-[#00C0DE] flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs text-[#7A95B0] uppercase tracking-wider">{label}</span>
        {href ? (
          <a href={href} className="text-sm text-[#0A0F1E] font-medium hover:text-[#00C0DE] transition-colors duration-150 break-all">
            {value}
          </a>
        ) : (
          <span className="text-sm text-[#0A0F1E] font-medium">{value}</span>
        )}
      </div>
    </div>
  );
}

export default function ContactoPage() {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" }>({
    visible: false,
    message: "",
    type: "success",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    await new Promise((r) => setTimeout(r, 1200));

    setSending(false);
    setToast({ visible: true, message: "¡Mensaje enviado! Te contactamos a la brevedad.", type: "success" });
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      {/* Header */}
      <header className="pt-16 pb-14 bg-white border-b border-[#E4EBF5] overflow-hidden relative">
        <div aria-hidden="true" className="blur-orb w-80 h-80 bg-[#00C0DE]/08 -top-16 -right-16" />
        <Container>
          <AnimatedSection>
            <span className="text-[#00C0DE] text-xs font-semibold uppercase tracking-widest">
              Estamos para ayudarte
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0F1E] leading-tight">
              Contacto
            </h1>
            <p className="mt-4 text-[#7A95B0] text-lg leading-relaxed max-w-xl">
              Completá el formulario o contactanos directamente. Te respondemos
              a la brevedad.
            </p>
          </AnimatedSection>
        </Container>
      </header>

      {/* Formulario + Info */}
      <section aria-label="Formulario de contacto" className="py-16 bg-[#F6F9FC]">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

            {/* Formulario — 3/5 */}
            <AnimatedSection className="lg:col-span-3" direction="right">
              <div className="bg-white rounded-3xl border border-[#E4EBF5] p-8 shadow-[0_1px_4px_rgba(10,15,30,0.04)]">
                <h2 className="font-bold text-[#0A0F1E] text-lg mb-6">Envianos un mensaje</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FloatingInput id="nombre" name="nombre" label="Nombre" required />
                    <FloatingInput id="empresa" name="empresa" label="Empresa" />
                  </div>
                  <FloatingInput id="email" name="email" type="email" label="Email" required />
                  <FloatingInput id="telefono" name="telefono" type="tel" label="Teléfono" />
                  <FloatingTextarea id="mensaje" name="mensaje" label="Mensaje" required rows={5} />

                  <CTAButton
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={sending}
                    className="mt-1"
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Enviando...
                      </span>
                    ) : "Enviar mensaje"}
                  </CTAButton>

                  <p className="text-center text-xs text-[#7A95B0]">
                    Te respondemos dentro de las próximas 24 horas hábiles.
                  </p>
                </form>
              </div>
            </AnimatedSection>

            {/* Aside — 2/5 */}
            <AnimatedSection className="lg:col-span-2" direction="left" delay={0.1}>
              <div className="flex flex-col gap-4 h-full">
                <h2 className="font-bold text-[#0A0F1E] text-lg">Información de contacto</h2>

                <ContactCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5 h-4 w-4">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  }
                  label="Ubicación"
                  value={CONTACT_INFO.city}
                />
                <ContactCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l1.54-1.54a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  }
                  label="Teléfono"
                  value={CONTACT_INFO.phone}
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                />
                <ContactCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  }
                  label="Email"
                  value={CONTACT_INFO.email}
                  href={`mailto:${CONTACT_INFO.email}`}
                />

                {/* Card presupuesto */}
                <div className="relative mt-2 rounded-2xl bg-gradient-to-br from-[#E6F9FD] to-[#F0FBFE] border border-[#00C0DE]/15 p-6 overflow-hidden">
                  <div aria-hidden="true" className="blur-orb w-32 h-32 bg-[#00C0DE]/10 -top-8 -right-8" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center mb-3 shadow-[0_1px_4px_rgba(0,192,222,0.1)]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#00C0DE" strokeWidth="2" className="h-5 w-5">
                        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#0A0F1E] mb-1.5">Presupuestos sin cargo</h3>
                    <p className="text-sm text-[#3D5068] leading-relaxed">
                      Analizamos tu necesidad y te enviamos una cotización detallada
                      sin ningún compromiso.
                    </p>
                  </div>
                </div>

                {/* Horario */}
                <div className="rounded-2xl bg-white border border-[#E4EBF5] p-5">
                  <h3 className="text-xs font-semibold text-[#0A0F1E] uppercase tracking-widest mb-3">Horario de atención</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { dia: "Lun – Vie", hora: "8:00 – 18:00" },
                      { dia: "Sábados", hora: "9:00 – 13:00" },
                    ].map(({ dia, hora }) => (
                      <div key={dia} className="flex justify-between text-sm">
                        <span className="text-[#7A95B0]">{dia}</span>
                        <span className="font-medium text-[#0A0F1E]">{hora}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-1.5 mt-1 pt-2 border-t border-[#F0F4FA] text-xs text-[#00C0DE] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C0DE] animate-pulse" />
                      Urgencias industriales 24/7
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}
