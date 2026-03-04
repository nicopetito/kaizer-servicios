"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import { FormInput, FormTextarea, FormSelect, FormToggle } from "@/components/admin/FormField";
import { createClient } from "@/lib/supabase";
import type { Producto, CategoriaProducto } from "@/lib/types";

type ProductoConCategoria = Producto & { categorias_producto?: CategoriaProducto | null };

const EMPTY_FORM = {
  nombre: "",
  descripcion: "",
  precio: "",
  material: "",
  marca: "",
  categoria_id: "",
  imagen_url: "",
  disponible: true,
  destacado: false,
  orden: 0,
};

function formatPrecio(n: number | null) {
  if (!n) return "—";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function AdminCatalogoPage() {
  const supabase = createClient();
  const [productos, setProductos] = useState<ProductoConCategoria[]>([]);
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);
  const [catFilter, setCatFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<ProductoConCategoria | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Modal de categorías
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [newCatNombre, setNewCatNombre] = useState("");
  const [catSaving, setCatSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase
        .from("productos")
        .select("*, categorias_producto(id, nombre)")
        .order("orden", { ascending: true }),
      supabase.from("categorias_producto").select("*").order("nombre"),
    ]);
    setProductos(prods ?? []);
    setCategorias(cats ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openCreate() {
    setEditando(null);
    setForm({ ...EMPTY_FORM });
    setError(null);
    setModalOpen(true);
  }

  function openEdit(p: ProductoConCategoria) {
    setEditando(p);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio?.toString() ?? "",
      material: p.material ?? "",
      marca: p.marca ?? "",
      categoria_id: p.categoria_id?.toString() ?? "",
      imagen_url: p.imagen_url ?? "",
      disponible: p.disponible,
      destacado: p.destacado,
      orden: p.orden,
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
      precio: form.precio ? parseFloat(form.precio) : null,
      material: form.material.trim() || null,
      marca: form.marca.trim() || null,
      categoria_id: form.categoria_id ? parseInt(form.categoria_id) : null,
      imagen_url: form.imagen_url.trim() || null,
      disponible: form.disponible,
      destacado: form.destacado,
      orden: Number(form.orden),
    };

    const { error: dbError } = editando
      ? await supabase.from("productos").update(payload).eq("id", editando.id)
      : await supabase.from("productos").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    setModalOpen(false);
    await fetchData();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("productos").delete().eq("id", id);
    setDeleteConfirm(null);
    await fetchData();
  }

  async function handleAddCategoria() {
    if (!newCatNombre.trim()) return;
    setCatSaving(true);
    await supabase
      .from("categorias_producto")
      .insert({ nombre: newCatNombre.trim() });
    setNewCatNombre("");
    setCatSaving(false);
    await fetchData();
  }

  async function handleDeleteCategoria(id: number) {
    await supabase.from("categorias_producto").delete().eq("id", id);
    await fetchData();
  }

  const productosFiltrados =
    catFilter === "all"
      ? productos
      : productos.filter((p) => p.categoria_id?.toString() === catFilter);

  return (
    <>
      <AdminHeader
        title="Catálogo"
        description={`${productos.length} productos · ${categorias.length} categorías`}
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setCatModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] border border-kaizer-border text-kaizer-muted text-sm hover:bg-bg-secondary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
              Categorías
            </button>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-kaizer-cyan text-white text-sm font-semibold hover:bg-kaizer-cyan-dark transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Nuevo producto
            </button>
          </div>
        }
      />

      <div className="p-6">
        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setCatFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
              catFilter === "all"
                ? "bg-kaizer-cyan text-white border-kaizer-cyan"
                : "border-kaizer-border text-kaizer-muted hover:border-kaizer-cyan/50"
            }`}
          >
            Todos ({productos.length})
          </button>
          {categorias.map((c) => {
            const count = productos.filter((p) => p.categoria_id === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCatFilter(c.id.toString())}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  catFilter === c.id.toString()
                    ? "bg-kaizer-cyan text-white border-kaizer-cyan"
                    : "border-kaizer-border text-kaizer-muted hover:border-kaizer-cyan/50"
                }`}
              >
                {c.nombre} ({count})
              </button>
            );
          })}
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
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium">Producto</th>
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium hidden lg:table-cell">Marca / Material</th>
                  <th className="text-left px-4 py-3 text-kaizer-muted font-medium hidden md:table-cell">Categoría</th>
                  <th className="text-right px-4 py-3 text-kaizer-muted font-medium">Precio</th>
                  <th className="text-center px-4 py-3 text-kaizer-muted font-medium">Disponible</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-kaizer-border">
                {productosFiltrados.map((p) => (
                  <tr key={p.id} className="hover:bg-bg-secondary/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.imagen_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.imagen_url}
                            alt={p.nombre}
                            className="h-10 w-10 rounded-[var(--radius-sm)] object-cover flex-shrink-0 border border-kaizer-border"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-[var(--radius-sm)] bg-kaizer-border/40 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-kaizer-white">{p.nombre}</p>
                          {p.destacado && (
                            <span className="text-xs text-amber-600">★ Destacado</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-kaizer-light">{p.marca ?? "—"}</p>
                      <p className="text-xs text-kaizer-muted">{p.material ?? "—"}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded-full text-xs border border-kaizer-border text-kaizer-muted">
                        {p.categorias_producto?.nombre ?? "Sin categoría"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-kaizer-white">
                      {formatPrecio(p.precio)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                          p.disponible
                            ? "bg-emerald-100 text-emerald-600 border-emerald-200"
                            : "bg-bg-secondary text-kaizer-muted border-kaizer-border"
                        }`}
                      >
                        {p.disponible ? "Disponible" : "Sin stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => openEdit(p)}
                          className="h-8 w-8 flex items-center justify-center rounded-[var(--radius-sm)] text-kaizer-muted hover:text-kaizer-cyan hover:bg-kaizer-cyan/10 transition-colors"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
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
                ))}
              </tbody>
            </table>
            {productosFiltrados.length === 0 && (
              <p className="text-center text-kaizer-muted py-12 text-sm">
                No hay productos en esta categoría.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal crear/editar producto */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editando ? "Editar producto" : "Nuevo producto"}
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <FormInput
              label="Nombre"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              placeholder="Compresor de Aire 500 L"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <FormTextarea
              label="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
              rows={3}
              placeholder="Descripción del producto..."
              required
            />
          </div>

          <FormInput
            label="Precio (ARS)"
            type="number"
            value={form.precio}
            onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value }))}
            placeholder="1850000"
          />

          <FormSelect
            label="Categoría"
            value={form.categoria_id}
            onChange={(e) => setForm((f) => ({ ...f, categoria_id: e.target.value }))}
          >
            <option value="">Sin categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </FormSelect>

          <FormInput
            label="Marca"
            value={form.marca}
            onChange={(e) => setForm((f) => ({ ...f, marca: e.target.value }))}
            placeholder="Schulz"
          />

          <FormInput
            label="Material"
            value={form.material}
            onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))}
            placeholder="Acero con recubrimiento epoxi"
          />

          <div className="sm:col-span-2">
            <FormInput
              label="URL de imagen"
              value={form.imagen_url}
              onChange={(e) => setForm((f) => ({ ...f, imagen_url: e.target.value }))}
              placeholder="https://..."
              type="url"
            />
            {form.imagen_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.imagen_url}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded-[var(--radius-md)] border border-kaizer-border"
              />
            )}
          </div>

          <FormInput
            label="Orden"
            type="number"
            value={form.orden}
            onChange={(e) => setForm((f) => ({ ...f, orden: Number(e.target.value) }))}
          />

          <div />

          <div className="sm:col-span-2 flex flex-col gap-3 pt-2 border-t border-kaizer-border">
            <FormToggle
              label="Disponible"
              description="Visible en el catálogo público"
              checked={form.disponible}
              onChange={(v) => setForm((f) => ({ ...f, disponible: v }))}
            />
            <FormToggle
              label="Destacado"
              description="Aparece en sección destacados"
              checked={form.destacado}
              onChange={(v) => setForm((f) => ({ ...f, destacado: v }))}
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
              {saving ? "Guardando..." : editando ? "Guardar cambios" : "Crear producto"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Modal categorías */}
      <AdminModal
        open={catModalOpen}
        onClose={() => setCatModalOpen(false)}
        title="Gestionar categorías"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <ul className="divide-y divide-kaizer-border">
            {categorias.map((c) => (
              <li key={c.id} className="flex items-center justify-between py-2.5">
                <span className="text-sm text-kaizer-white">{c.nombre}</span>
                <button
                  onClick={() => handleDeleteCategoria(c.id)}
                  className="h-7 w-7 flex items-center justify-center rounded-[var(--radius-sm)] text-kaizer-muted hover:text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 pt-2 border-t border-kaizer-border">
            <input
              value={newCatNombre}
              onChange={(e) => setNewCatNombre(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategoria()}
              placeholder="Nueva categoría..."
              className="flex-1 px-3.5 py-2 rounded-[var(--radius-md)] border border-kaizer-border bg-bg-secondary text-kaizer-white text-sm placeholder:text-kaizer-muted/60 focus:outline-none focus:ring-2 focus:ring-kaizer-cyan/30 focus:border-kaizer-cyan"
            />
            <button
              onClick={handleAddCategoria}
              disabled={catSaving || !newCatNombre.trim()}
              className="px-4 py-2 rounded-[var(--radius-md)] bg-kaizer-cyan text-white text-sm font-semibold hover:bg-kaizer-cyan-dark transition-colors disabled:opacity-60"
            >
              Agregar
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Modal confirmar eliminación */}
      <AdminModal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Eliminar producto"
        size="sm"
      >
        <p className="text-kaizer-muted text-sm mb-6">
          ¿Estás seguro de que querés eliminar este producto?
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
