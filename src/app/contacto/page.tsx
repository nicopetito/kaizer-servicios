import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title:       "Contacto",
  description: "Contactá a Kaizer Servicios para solicitar un presupuesto o hacer una consulta industrial.",
};

export default function ContactoPage() {
  return (
    <>
      {/* ── Encabezado ── */}
      <header className="py-16 bg-kaizer-surface border-b border-kaizer-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-kaizer-blue text-sm font-semibold uppercase tracking-widest">
              Estamos para ayudarte
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-kaizer-white leading-tight">
              Contacto
            </h1>
            <p className="mt-4 text-kaizer-muted text-lg leading-relaxed">
              Completá el formulario o contactanos directamente. Te respondemos
              a la brevedad.
            </p>
          </div>
        </Container>
      </header>

      {/* ── Formulario + Info ── */}
      <section aria-label="Formulario de contacto" className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">

            {/* Formulario — ocupa 3/5 */}
            <div className="lg:col-span-3">
              <form
                className="flex flex-col gap-5"
                /* onSubmit se conectará al backend en la siguiente fase */
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nombre" className="text-sm font-medium text-kaizer-light">
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="rounded-[var(--radius-md)] border border-kaizer-border bg-kaizer-surface px-4 py-2.5 text-sm text-kaizer-light placeholder:text-kaizer-muted/60 focus:outline-none focus:border-kaizer-blue transition-colors duration-150"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="empresa" className="text-sm font-medium text-kaizer-light">
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      className="rounded-[var(--radius-md)] border border-kaizer-border bg-kaizer-surface px-4 py-2.5 text-sm text-kaizer-light placeholder:text-kaizer-muted/60 focus:outline-none focus:border-kaizer-blue transition-colors duration-150"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-kaizer-light">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="rounded-[var(--radius-md)] border border-kaizer-border bg-kaizer-surface px-4 py-2.5 text-sm text-kaizer-light placeholder:text-kaizer-muted/60 focus:outline-none focus:border-kaizer-blue transition-colors duration-150"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="telefono" className="text-sm font-medium text-kaizer-light">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="+54 223 000-0000"
                    className="rounded-[var(--radius-md)] border border-kaizer-border bg-kaizer-surface px-4 py-2.5 text-sm text-kaizer-light placeholder:text-kaizer-muted/60 focus:outline-none focus:border-kaizer-blue transition-colors duration-150"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mensaje" className="text-sm font-medium text-kaizer-light">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    placeholder="Contanos en qué podemos ayudarte..."
                    className="rounded-[var(--radius-md)] border border-kaizer-border bg-kaizer-surface px-4 py-2.5 text-sm text-kaizer-light placeholder:text-kaizer-muted/60 focus:outline-none focus:border-kaizer-blue transition-colors duration-150 resize-none"
                  />
                </div>

                <CTAButton type="submit" fullWidth size="lg">
                  Enviar mensaje
                </CTAButton>
              </form>
            </div>

            {/* Info de contacto — ocupa 2/5 */}
            <aside className="lg:col-span-2 flex flex-col gap-6">
              <div className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface p-6 flex flex-col gap-5">
                <h2 className="font-semibold text-kaizer-white">Información de contacto</h2>

                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-kaizer-muted text-xs uppercase tracking-wider">Ubicación</span>
                    <span className="text-kaizer-light">{CONTACT_INFO.city}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-kaizer-muted text-xs uppercase tracking-wider">Teléfono</span>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                      className="text-kaizer-light hover:text-white transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-kaizer-muted text-xs uppercase tracking-wider">Email</span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-kaizer-light hover:text-white transition-colors break-all"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-kaizer-blue/20 bg-kaizer-blue/5 p-6">
                <h3 className="font-semibold text-kaizer-white mb-2">Presupuestos sin cargo</h3>
                <p className="text-sm text-kaizer-muted leading-relaxed">
                  Analizamos tu necesidad y te enviamos una cotización detallada
                  sin ningún compromiso.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
