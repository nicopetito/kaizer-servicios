"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import { FormInput, FormTextarea, FormToggle } from "@/components/admin/FormField";
import { createClient } from "@/lib/supabase";
import type { Servicio } from "@/lib/types";

const ICONOS_OPCIONES = [
  { value: "paint", label: "Pintura" },
  { value: "wrench", label: "Herramienta" },
  { value: "rocket", label: "Puesta en marcha" },
  { value: "calendar", label: "Calendario" },
  { value: "zap", label: "Eléctrico" },
  { value: "flame", label: "Soldadura" },
];

const EMPTY: Omit<Servicio, "id" | "created_at" | "updated_at" | "iniciales"> = {
  nombre: "",
  descripcion: "",
  icono: "wrench",
  etiquetas: [],
  destacado: false,
  orden: 0,
  activo: true,
};

export default function AdminServiciosPage() {
  const supabase = createClient();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Servicio | null>(null);
  const [form, setForm] = useState({ ...EMPTY, etiquetasStr: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchServicios = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("servicios")
      .select("*")
      .order("orden", { ascending: true });
    setServicios(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchServicios(); }, [fetchServicios]);

  function openCreate() {
    setEditando(null);
    setForm({ ...EMPTY, etiquetasStr: "" });
    setError(null);
    setModalOpen(true);
  }

  function openEdit(s: Servicio) {
    setEditando(s);
    setForm({
      nombre: s.nombre,
      descripcion: s.descripcion,
      icono: s.icono ?? "wrench",
      etiquetas: s.etiquetas ?? [],
      destacado: s.destacado,
      orden: s.orden,
      activo: s.activo,
      etiquetasStr: (s.etiquetas ?? []).join(", "),
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.nombre.trim() || !form.descripcion.trim()) {
      setError("Nombre y descripción son obligatorios.");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      icono: form.icono || null,
      etiquetas: form.etiquetasStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      destacado: form.destacado,
      orden: Number(form.orden),
      activo: form.activo,
    };

    const { error: dbError } = editando
      ? await supabase.from("servicios").update(payload).eq("id", editando.id)
      : await supabase.from("servicios").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    setModalOpen(false);
    await fetchServicios();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("servicios").delete().eq("id", id);
    setDeleteConfirm(null);
    await fetchServicios();
  }

  async function toggleActivo(s: Servicio) {
    await supabase
      .from("servicios")
      .update({ activo: !s.activo })
      .eq("id", s.id);
    await fetchServicios();
  }

  return (
    <>
      <AdminHeader
        title="Servicios"
        description={`${servicios.length} servicios registrados`}
        action={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-kaizer-cyan text-white text-sm font-semibold hover:bg-kaizer-cyan-dark transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo servicio
          </button>
        }
      />

      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-kaizer-muted text-sm">
            Cargando...
          </div>
        ) : (
          <div className="bg-white rounded-[var(--radius-lg)] border border-kaizer-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-kaizer-border bg-bg-secondary">
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium">Nombre</th>
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium hidden md:table-cell">Etiquetas</th>
                  <th className="text-center px-4 py-3 text-kaizer-muted font-medium">Orden</th>
                  <th className="text-center px-4 py-3 text-kaizer-muted font-medium">Destacado</th>
                  <th className="text-center px-4 py-3 text-kaizer-muted font-medium">Activo</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-kaizer-border">
                {servicios.map((s) => (
                  <tr key={s.id} className="hover:bg-bg-secondary/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-kaizer-white">{s.nombre}</p>
                      <p className="text-xs text-kaizer-muted line-clamp-1 mt-0.5 hidden sm:block">
                        {s.descripcion}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(s.etiquetas ?? []).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs bg-kaizer-cyan/10 text-kaizer-cyan border border-kaizer-cyan/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-kaizer-muted">{s.orden}</td>
                    <td className="px-4 py-3 text-center">
                      {s.destacado ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-600 border border-amber-200">
                          ★ Sí
                        </span>
                      ) : (
                        <span className="text-kaizer-muted text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActivo(s)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          s.activo
                            ? "bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200"
                            : "bg-bg-secondary text-kaizer-muted border-kaizer-border hover:bg-kaizer-border"
                        }`}
                      >
                        {s.activo ? "Activo" : "Inactivo"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => openEdit(s)}
                          className="h-8 w-8 flex items-center justify-center rounded-[var(--radius-sm)] text-kaizer-muted hover:text-kaizer-cyan hover:bg-kaizer-cyan/10 transition-colors"
                          title="Editar"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(s.id)}
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
            {servicios.length === 0 && (
              <p className="text-center text-kaizer-muted py-12 text-sm">
                No hay servicios todavía. ¡Creá el primero!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal crear/editar */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editando ? "Editar servicio" : "Nuevo servicio"}
      >
        <div className="flex flex-col gap-5">
          <FormInput
            label="Nombre"
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            placeholder="Pintura Industrial"
            required
          />

          <FormTextarea
            label="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
            rows={3}
            placeholder="Descripción del servicio..."
            required
          />

          <div>
            <label className="block text-sm font-medium text-kaizer-light mb-1.5">
              Ícono
            </label>
            <div className="flex flex-wrap gap-2">
              {ICONOS_OPCIONES.map((ic) => (
                <button
                  key={ic.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, icono: ic.value }))}
                  className={`px-3 py-1.5 rounded-[var(--radius-md)] text-xs border transition-colors ${
                    form.icono === ic.value
                      ? "bg-kaizer-cyan text-white border-kaizer-cyan"
                      : "border-kaizer-border text-kaizer-muted hover:border-kaizer-cyan/50"
                  }`}
                >
                  {ic.label}
                </button>
              ))}
            </div>
          </div>

          <FormInput
            label="Etiquetas (separadas por coma)"
            value={form.etiquetasStr}
            onChange={(e) => setForm((f) => ({ ...f, etiquetasStr: e.target.value }))}
            placeholder="Anticorrosivos, Epoxi, Airless"
          />

          <FormInput
            label="Orden"
            type="number"
            value={form.orden}
            onChange={(e) => setForm((f) => ({ ...f, orden: Number(e.target.value) }))}
          />

          <div className="flex flex-col gap-3 pt-2 border-t border-kaizer-border">
            <FormToggle
              label="Destacado"
              description="Aparece destacado en la home"
              checked={form.destacado}
              onChange={(v) => setForm((f) => ({ ...f, destacado: v }))}
            />
            <FormToggle
              label="Activo"
              description="Visible en el sitio público"
              checked={form.activo}
              onChange={(v) => setForm((f) => ({ ...f, activo: v }))}
            />
          </div>

          {error && (
            <p className="text-sm text-rose-500 bg-rose-50 border border-rose-200 px-3 py-2 rounded-[var(--radius-md)]">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 py-2.5 rounded-[var(--radius-md)] border border-kaizer-border text-kaizer-muted text-sm hover:bg-bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 rounded-[var(--radius-md)] bg-kaizer-cyan text-white text-sm font-semibold hover:bg-kaizer-cyan-dark transition-colors disabled:opacity-60"
            >
              {saving ? "Guardando..." : editando ? "Guardar cambios" : "Crear servicio"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Modal confirmar eliminación */}
      <AdminModal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Eliminar servicio"
        size="sm"
      >
        <p className="text-kaizer-muted text-sm mb-6">
          ¿Estás seguro de que querés eliminar este servicio? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setDeleteConfirm(null)}
            className="flex-1 py-2.5 rounded-[var(--radius-md)] border border-kaizer-border text-kaizer-muted text-sm hover:bg-bg-secondary transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            className="flex-1 py-2.5 rounded-[var(--radius-md)] bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </AdminModal>
    </>
  );
}
