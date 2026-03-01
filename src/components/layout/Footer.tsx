import Link from "next/link";
import type { ReactElement } from "react";
import { SITE_NAME, CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import Container from "@/components/ui/Container";
import type { SocialLink } from "@/lib/constants";

// ─── Íconos SVG inline (sin dependencias externas) ───────────────

function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l1.54-1.54a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  const icons: Record<SocialLink["icon"], ReactElement> = {
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    whatsapp: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  };
  return icons[icon] ?? null;
}

// ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-kaizer-surface border-t border-kaizer-border mt-auto">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Marca */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <svg viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kaizer Servicios" className="h-8 w-auto">
                <rect x="0" y="0" width="36" height="36" rx="18" fill="#07090E" />
                <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="#1A2235" strokeWidth="1" />
                <rect x="10" y="9" width="4" height="18" rx="1.5" fill="#EEF4FB" />
                <path d="M14 18 L26 9 L26 13 L17 18.5Z" fill="#00C0DE" />
                <path d="M14 18 L26 27 L26 23 L17 17.5Z" fill="#EEF4FB" />
                <text x="42" y="14" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" fill="#EEF4FB">KAIZER</text>
                <text x="42" y="27" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="400" letterSpacing="3" fill="#8FA3BB">SERVICIOS</text>
              </svg>
            </Link>
            <p className="text-kaizer-muted text-sm leading-relaxed max-w-xs">
              Empresa de servicios industriales con presencia en Mar del Plata
              y la región. Calidad, compromiso y soluciones a medida.
            </p>
          </div>

          {/* Col 2 — Navegación */}
          <div>
            <h3 className="text-kaizer-white text-sm font-semibold uppercase tracking-widest mb-4">
              Navegación
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-kaizer-muted text-sm hover:text-kaizer-light transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contacto */}
          <div>
            <h3 className="text-kaizer-white text-sm font-semibold uppercase tracking-widest mb-4">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-kaizer-muted text-sm">
                <IconMapPin />
                <span>{CONTACT_INFO.city}</span>
              </li>
              <li className="flex items-center gap-2 text-kaizer-muted text-sm">
                <IconPhone />
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="hover:text-kaizer-light transition-colors duration-150"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-kaizer-muted text-sm">
                <IconMail />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-kaizer-light transition-colors duration-150"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Redes sociales */}
          <div>
            <h3 className="text-kaizer-white text-sm font-semibold uppercase tracking-widest mb-4">
              Seguinos
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] bg-kaizer-border text-kaizer-muted hover:bg-kaizer-cyan hover:text-kaizer-dark transition-all duration-200"
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 pt-6 border-t border-kaizer-border flex flex-col sm:flex-row items-center justify-between gap-3 text-kaizer-muted text-xs">
          <p>© {year} {SITE_NAME}. Todos los derechos reservados.</p>
          <p>Mar del Plata, Argentina</p>
        </div>
      </Container>
    </footer>
  );
}
