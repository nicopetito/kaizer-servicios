"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import { createClient } from "@/lib/supabase";
import type { Articulo } from "@/lib/types";

function formatFecha(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlogPage() {
  const supabase = createClient();
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<Articulo | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const fetchArticulos = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("articulos")
      .select("*")
      .order("created_at", { ascending: false });
    setArticulos(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchArticulos(); }, [fetchArticulos]);

  async function handleDelete(id: string) {
    await supabase.from("articulos").delete().eq("id", id);
    setDeleteConfirm(null);
    await fetchArticulos();
  }

  async function togglePublicado(a: Articulo) {
    await supabase
      .from("articulos")
      .update({ publicado: !a.publicado })
      .eq("id", a.id);
    await fetchArticulos();
  }

  const filtrados = busqueda.trim()
    ? articulos.filter(
        (a) =>
          a.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          a.categoria?.toLowerCase().includes(busqueda.toLowerCase()) ||
          a.autor?.toLowerCase().includes(busqueda.toLowerCase())
      )
    : articulos;

  const publicados = articulos.filter((a) => a.publicado).length;
  const borradores = articulos.filter((a) => !a.publicado).length;

  return (
    <>
      <AdminHeader
        title="Blog"
        description={`${publicados} publicados · ${borradores} borradores`}
        action={
          <Link
            href="/admin/blog/nuevo"
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-kaizer-cyan text-white text-sm font-semibold hover:bg-kaizer-cyan-dark transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo artículo
          </Link>
        }
      />

      <div className="p-6">
        {/* Búsqueda */}
        <div className="relative mb-5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-kaizer-muted pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título, categoría o autor..."
            className="w-full max-w-sm pl-10 pr-4 py-2 rounded-[var(--radius-md)] border border-kaizer-border bg-white text-kaizer-white text-sm placeholder:text-kaizer-muted/60 focus:outline-none focus:ring-2 focus:ring-kaizer-cyan/30 focus:border-kaizer-cyan transition-colors"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-kaizer-muted text-sm">
            Cargando...
          </div>
        ) : (
          <div className="bg-white rounded-[var(--radius-lg)] border border-kaizer-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-kaizer-border bg-bg-secondary">
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium">Artículo</th>
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium hidden md:table-cell">Categoría</th>
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium hidden lg:table-cell">Autor</th>
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium hidden lg:table-cell">Fecha</th>
                  <th className="text-center px-4 py-3 text-kaizer-muted font-medium">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-kaizer-border">
                {filtrados.map((a) => (
                  <tr key={a.id} className="hover:bg-bg-secondary/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {a.imagen_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.imagen_url}
                            alt={a.titulo}
                            className="h-10 w-16 rounded-[var(--radius-sm)] object-cover flex-shrink-0 border border-kaizer-border"
                          />
                        ) : (
                          <div className="h-10 w-16 rounded-[var(--radius-sm)] bg-kaizer-border/40 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-kaizer-white truncate">{a.titulo}</p>
                          <p className="text-xs text-kaizer-muted font-mono truncate">{a.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {a.categoria ? (
                        <span className="px-2 py-0.5 rounded-full text-xs border border-kaizer-border text-kaizer-muted">
                          {a.categoria}
                        </span>
                      ) : (
                        <span className="text-kaizer-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-kaizer-muted">
                      {a.autor ?? "—"}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-kaizer-muted">
                      {formatFecha(a.fecha_publicacion)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => togglePublicado(a)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          a.publicado
                            ? "bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200"
                            : "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {a.publicado ? "Publicado" : "Borrador"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Link
                          href={`/blog/${a.slug}`}
                          target="_blank"
                          className="h-8 w-8 flex items-center justify-center rounded-[var(--radius-sm)] text-kaizer-muted hover:text-kaizer-light hover:bg-bg-secondary transition-colors"
                          title="Ver en el sitio"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/blog/${a.id}`}
                          className="h-8 w-8 flex items-center justify-center rounded-[var(--radius-sm)] text-kaizer-muted hover:text-kaizer-cyan hover:bg-kaizer-cyan/10 transition-colors"
                          title="Editar"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(a)}
                          className="h-8 w-8 flex items-center justify-center rounded-[var(--radius-sm)] text-kaizer-muted hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Eliminar"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtrados.length === 0 && (
              <p className="text-center text-kaizer-muted py-12 text-sm">
                {busqueda ? "No hay artículos que coincidan con la búsqueda." : "No hay artículos todavía."}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal confirmar eliminación */}
      <AdminModal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Eliminar artículo"
        size="sm"
      >
        <p className="text-kaizer-muted text-sm mb-2">
          ¿Estás seguro de que querés eliminar este artículo?
        </p>
        <p className="text-kaizer-white text-sm font-medium mb-6">
          &ldquo;{deleteConfirm?.titulo}&rdquo;
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setDeleteConfirm(null)}
            className="flex-1 py-2.5 rounded-[var(--radius-md)] border border-kaizer-border text-kaizer-muted text-sm hover:bg-bg-secondary transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)}
            className="flex-1 py-2.5 rounded-[var(--radius-md)] bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </AdminModal>
    </>
  );
}
