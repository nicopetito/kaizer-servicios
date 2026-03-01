// ─────────────────────────────────────────────
//  CONSTANTES GLOBALES — KAIZER SERVICIOS
//  Fuente única de verdad para datos del sitio.
//  Actualizar aquí afecta a todos los componentes.
// ─────────────────────────────────────────────

export const SITE_NAME = "Kaizer Servicios" as const;

export const SITE_DESCRIPTION =
  "Empresa de servicios industriales en Mar del Plata. Soluciones integrales en mantenimiento, instalaciones y proyectos industriales.";

// ─── Navegación ───────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio",          href: "/"           },
  { label: "Servicios",       href: "/servicios"  },
  { label: "Catálogo",        href: "/catalogo"   },
  { label: "Blog",            href: "/blog"       },
  { label: "Acerca de nosotros", href: "/nosotros" },
  { label: "Contacto",        href: "/contacto"   },
];

// ─── Información de contacto ──────────────────
export const CONTACT_INFO = {
  city:    "Mar del Plata, Buenos Aires",
  phone:   "+54 223 000-0000",
  email:   "contacto@kaizerservicios.com.ar",
  address: "Mar del Plata, Provincia de Buenos Aires, Argentina",
} as const;

// ─── Redes sociales (placeholders) ────────────
export interface SocialLink {
  label: string;
  href:  string;
  icon:  "linkedin" | "instagram" | "facebook" | "whatsapp";
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn",  href: "#", icon: "linkedin"  },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook",  href: "#", icon: "facebook"  },
  { label: "WhatsApp",  href: "#", icon: "whatsapp"  },
];
