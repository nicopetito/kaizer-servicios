"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import { FormInput, FormTextarea, FormToggle } from "@/components/admin/FormField";
import { createClient } from "@/lib/supabase";
import type { Empleado } from "@/lib/types";

const EMPTY_FORM = {
  nombre: "",
  apellido: "",
  cargo: "",
  descripcion: "",
  foto_url: "",
  linkedin_url: "",
  activo: true,
};

function EmpleadoRow({
  empleado,
  onEdit,
  onDelete,
  onToggle,
}: {
  empleado: Empleado;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: empleado.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="hover:bg-bg-secondary/50 transition-colors"
    >
      <td className="px-3 py-3">
        <button
          {...attributes}
          {...listeners}
          className="text-kaizer-muted/40 hover:text-kaizer-muted cursor-grab active:cursor-grabbing p-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <circle cx="9" cy="5" r="1" fill="currentColor" />
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="9" cy="19" r="1" fill="currentColor" />
            <circle cx="15" cy="5" r="1" fill="currentColor" />
            <circle cx="15" cy="12" r="1" fill="currentColor" />
            <circle cx="15" cy="19" r="1" fill="currentColor" />
          </svg>
        </button>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-kaizer-cyan/10 border border-kaizer-cyan/20 flex items-center justify-center text-kaizer-cyan font-semibold text-sm flex-shrink-0">
            {empleado.iniciales}
          </div>
          <div>
            <p className="font-medium text-kaizer-white">
              {empleado.nombre} {empleado.apellido}
            </p>
            <p className="text-xs text-kaizer-muted">{empleado.cargo}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <p className="text-sm text-kaizer-muted line-clamp-2 max-w-xs">
          {empleado.descripcion ?? "—"}
        </p>
      </td>
      <td className="px-4 py-3 hidden lg:table-cell text-center">
        {empleado.linkedin_url ? (
          <a
            href={empleado.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-kaizer-cyan hover:underline text-xs"
          >
            Ver perfil
          </a>
        ) : (
          <span className="text-kaizer-muted text-xs">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-center">
        <button
          onClick={onToggle}
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            empleado.activo
              ? "bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200"
              : "bg-bg-secondary text-kaizer-muted border-kaizer-border hover:bg-kaizer-border"
          }`}
        >
          {empleado.activo ? "Activo" : "Inactivo"}
        </button>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={onEdit}
            className="h-8 w-8 flex items-center justify-center rounded-[var(--radius-sm)] text-kaizer-muted hover:text-kaizer-cyan hover:bg-kaizer-cyan/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="h-8 w-8 flex items-center justify-center rounded-[var(--radius-sm)] text-kaizer-muted hover:text-rose-500 hover:bg-rose-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminEquipoPage() {
  const supabase = createClient();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Empleado | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchEmpleados = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("empleados")
      .select("*")
      .order("orden", { ascending: true });
    setEmpleados(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchEmpleados(); }, [fetchEmpleados]);

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = empleados.findIndex((e) => e.id === active.id);
    const newIndex = empleados.findIndex((e) => e.id === over.id);
    const newOrder = arrayMove(empleados, oldIndex, newIndex);

    setEmpleados(newOrder);

    // Persiste el nuevo orden en la DB
    await Promise.all(
      newOrder.map((e, i) =>
        supabase.from("empleados").update({ orden: i + 1 }).eq("id", e.id)
      )
    );
  }

  function openCreate() {
    setEditando(null);
    setForm({ ...EMPTY_FORM });
    setError(null);
    setModalOpen(true);
  }

  function openEdit(e: Empleado) {
    setEditando(e);
    setForm({
      nombre: e.nombre,
      apellido: e.apellido,
      cargo: e.cargo,
      descripcion: e.descripcion ?? "",
      foto_url: e.foto_url ?? "",
      linkedin_url: e.linkedin_url ?? "",
      activo: e.activo,
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.nombre.trim() || !form.apellido.trim() || !form.cargo.trim()) {
      setError("Nombre, apellido y cargo son obligatorios.");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      cargo: form.cargo.trim(),
      descripcion: form.descripcion.trim() || null,
      foto_url: form.foto_url.trim() || null,
      linkedin_url: form.linkedin_url.trim() || null,
      activo: form.activo,
      orden: editando ? editando.orden : empleados.length + 1,
    };

    const { error: dbError } = editando
      ? await supabase.from("empleados").update(payload).eq("id", editando.id)
      : await supabase.from("empleados").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    setModalOpen(false);
    await fetchEmpleados();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("empleados").delete().eq("id", id);
    setDeleteConfirm(null);
    await fetchEmpleados();
  }

  async function toggleActivo(e: Empleado) {
    await supabase
      .from("empleados")
      .update({ activo: !e.activo })
      .eq("id", e.id);
    await fetchEmpleados();
  }

  return (
    <>
      <AdminHeader
        title="Equipo"
        description={`${empleados.length} integrantes · Arrastrá para reordenar`}
        action={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-kaizer-cyan text-white text-sm font-semibold hover:bg-kaizer-cyan-dark transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo integrante
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={empleados.map((e) => e.id)}
                strategy={verticalListSortingStrategy}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-kaizer-border bg-bg-secondary">
                      <th className="px-3 py-3 w-10" />
                      <th className="text-left px-4 py-3 text-kaizer-muted font-medium">Integrante</th>
                      <th className="text-left px-4 py-3 text-kaizer-muted font-medium hidden md:table-cell">Descripción</th>
                      <th className="text-center px-4 py-3 text-kaizer-muted font-medium hidden lg:table-cell">LinkedIn</th>
                      <th className="text-center px-4 py-3 text-kaizer-muted font-medium">Estado</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-kaizer-border">
                    {empleados.map((e) => (
                      <EmpleadoRow
                        key={e.id}
                        empleado={e}
                        onEdit={() => openEdit(e)}
                        onDelete={() => setDeleteConfirm(e.id)}
                        onToggle={() => toggleActivo(e)}
                      />
                    ))}
                  </tbody>
                </table>
              </SortableContext>
            </DndContext>
            {empleados.length === 0 && (
              <p className="text-center text-kaizer-muted py-12 text-sm">
                No hay integrantes todavía.
              </p>
            )}
          </div>
        )}

        <p className="text-xs text-kaizer-muted mt-3">
          El orden aquí determina el orden en la página de{" "}
          <a href="/nosotros" target="_blank" className="text-kaizer-cyan hover:underline">
            Nosotros
          </a>
          .
        </p>
      </div>

      {/* Modal crear/editar */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editando ? "Editar integrante" : "Nuevo integrante"}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput
            label="Nombre"
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            placeholder="Carlos"
            required
          />
          <FormInput
            label="Apellido"
            value={form.apellido}
            onChange={(e) => setForm((f) => ({ ...f, apellido: e.target.value }))}
            placeholder="Rodríguez"
            required
          />

          <div className="sm:col-span-2">
            <FormInput
              label="Cargo"
              value={form.cargo}
              onChange={(e) => setForm((f) => ({ ...f, cargo: e.target.value }))}
              placeholder="Director General"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <FormTextarea
              label="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
              rows={3}
              placeholder="Breve descripción del integrante..."
            />
          </div>

          <FormInput
            label="URL de foto"
            value={form.foto_url}
            onChange={(e) => setForm((f) => ({ ...f, foto_url: e.target.value }))}
            placeholder="https://..."
            type="url"
          />

          <FormInput
            label="LinkedIn URL"
            value={form.linkedin_url}
            onChange={(e) => setForm((f) => ({ ...f, linkedin_url: e.target.value }))}
            placeholder="https://linkedin.com/in/..."
            type="url"
          />

          <div className="sm:col-span-2 pt-2 border-t border-kaizer-border">
            <FormToggle
              label="Activo"
              description="Visible en la página de Nosotros"
              checked={form.activo}
              onChange={(v) => setForm((f) => ({ ...f, activo: v }))}
            />
          </div>

          {error && (
            <div className="sm:col-span-2">
              <p className="text-sm text-rose-500 bg-rose-50 border border-rose-200 px-3 py-2 rounded-[var(--radius-md)]">
                {error}
              </p>
            </div>
          )}

          <div className="sm:col-span-2 flex gap-3 pt-2">
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
              {saving ? "Guardando..." : editando ? "Guardar cambios" : "Agregar integrante"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Modal confirmar eliminación */}
      <AdminModal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Eliminar integrante"
        size="sm"
      >
        <p className="text-kaizer-muted text-sm mb-6">
          ¿Estás seguro de que querés eliminar este integrante?
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
