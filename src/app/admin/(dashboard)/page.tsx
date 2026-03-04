import type { Metadata } from "next";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  const supabase = await createSupabaseServerClient();

  const [servicios, productos, articulos, empleados] = await Promise.all([
    supabase.from("servicios").select("id, activo", { count: "exact" }),
    supabase.from("productos").select("id, disponible", { count: "exact" }),
    supabase.from("articulos").select("id, publicado", { count: "exact" }),
    supabase.from("empleados").select("id, activo", { count: "exact" }),
  ]);

  return {
    servicios: {
      total: servicios.count ?? 0,
      activos: (servicios.data ?? []).filter((s) => s.activo).length,
    },
    productos: {
      total: productos.count ?? 0,
      disponibles: (productos.data ?? []).filter((p) => p.disponible).length,
    },
    articulos: {
      total: articulos.count ?? 0,
      publicados: (articulos.data ?? []).filter((a) => a.publicado).length,
    },
    empleados: {
      total: empleados.count ?? 0,
      activos: (empleados.data ?? []).filter((e) => e.activo).length,
    },
  };
}

const CARDS = [
  {
    href: "/admin/servicios",
    label: "Servicios",
    color: "bg-kaizer-cyan/10 text-kaizer-cyan border-kaizer-cyan/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    href: "/admin/catalogo",
    label: "Catálogo",
    color: "bg-violet-100 text-violet-600 border-violet-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    href: "/admin/blog",
    label: "Blog",
    color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    href: "/admin/equipo",
    label: "Equipo",
    color: "bg-amber-100 text-amber-600 border-amber-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  const statValues = [
    {
      key: "servicios",
      main: stats.servicios.total,
      sub: `${stats.servicios.activos} activos`,
    },
    {
      key: "productos",
      main: stats.productos.total,
      sub: `${stats.productos.disponibles} disponibles`,
    },
    {
      key: "articulos",
      main: stats.articulos.total,
      sub: `${stats.articulos.publicados} publicados`,
    },
    {
      key: "empleados",
      main: stats.empleados.total,
      sub: `${stats.empleados.activos} activos`,
    },
  ];

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Resumen del contenido del sitio"
      />

      <div className="p-6 flex flex-col gap-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white rounded-[var(--radius-lg)] border border-kaizer-border p-5 flex flex-col gap-3 hover:border-kaizer-cyan/40 hover:shadow-sm transition-all duration-200"
            >
              <div className={`h-10 w-10 rounded-[var(--radius-md)] border flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-kaizer-white tabular-nums">
                  {statValues[i].main}
                </p>
                <p className="text-xs text-kaizer-muted mt-0.5">{card.label}</p>
                <p className="text-xs text-kaizer-muted/70 mt-0.5">
                  {statValues[i].sub}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Accesos rápidos */}
        <div>
          <h2 className="text-sm font-semibold text-kaizer-muted uppercase tracking-widest mb-4">
            Accesos rápidos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link
              href="/admin/blog/nuevo"
              className="flex items-center gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-kaizer-border hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-200 group"
            >
              <div className="h-9 w-9 rounded-[var(--radius-md)] bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-kaizer-white">Nuevo artículo</p>
                <p className="text-xs text-kaizer-muted">Publicar en el blog</p>
              </div>
            </Link>

            <Link
              href="/admin/catalogo"
              className="flex items-center gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-kaizer-border hover:border-violet-300 hover:bg-violet-50/50 transition-all duration-200 group"
            >
              <div className="h-9 w-9 rounded-[var(--radius-md)] bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-kaizer-white">Nuevo producto</p>
                <p className="text-xs text-kaizer-muted">Agregar al catálogo</p>
              </div>
            </Link>

            <Link
              href="/admin/servicios"
              className="flex items-center gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-kaizer-border hover:border-kaizer-cyan/40 hover:bg-kaizer-cyan/5 transition-all duration-200 group"
            >
              <div className="h-9 w-9 rounded-[var(--radius-md)] bg-kaizer-cyan/10 text-kaizer-cyan flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-kaizer-white">Nuevo servicio</p>
                <p className="text-xs text-kaizer-muted">Agregar a servicios</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="bg-kaizer-cyan/5 border border-kaizer-cyan/20 rounded-[var(--radius-lg)] p-5">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-kaizer-cyan/10 flex items-center justify-center text-kaizer-cyan flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-kaizer-white mb-1">
                ¿Primera vez?
              </p>
              <p className="text-xs text-kaizer-muted leading-relaxed">
                Antes de ver datos reales asegurate de haber ejecutado{" "}
                <code className="bg-kaizer-cyan/10 text-kaizer-cyan px-1 rounded">schema.sql</code> y{" "}
                <code className="bg-kaizer-cyan/10 text-kaizer-cyan px-1 rounded">admin-policies.sql</code>{" "}
                en Supabase → SQL Editor, y de haber creado un usuario en Supabase → Authentication → Users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
