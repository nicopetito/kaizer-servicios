"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TiptapEditor from "./TiptapEditor";
import { FormInput, FormTextarea, FormToggle } from "./FormField";
import { createClient } from "@/lib/supabase";
import type { Articulo } from "@/lib/types";

interface Props {
  articulo?: Articulo;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ArticuloForm({ articulo }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!articulo;

  const [form, setForm] = useState({
    titulo: articulo?.titulo ?? "",
    slug: articulo?.slug ?? "",
    extracto: articulo?.extracto ?? "",
    contenido: articulo?.contenido ?? "",
    autor: articulo?.autor ?? "",
    categoria: articulo?.categoria ?? "",
    tiempo_lectura: articulo?.tiempo_lectura?.toString() ?? "5",
    imagen_url: articulo?.imagen_url ?? "",
    tagsStr: (articulo?.tags ?? []).join(", "),
    publicado: articulo?.publicado ?? false,
    fecha_publicacion: articulo?.fecha_publicacion
      ? articulo.fecha_publicacion.split("T")[0]
      : new Date().toISOString().split("T")[0],
  });

  const [slugManual, setSlugManual] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generar slug desde el título
  useEffect(() => {
    if (!slugManual && form.titulo) {
      setForm((f) => ({ ...f, slug: slugify(form.titulo) }));
    }
  }, [form.titulo, slugManual]);

  async function handleSave(publicar?: boolean) {
    if (!form.titulo.trim()) {
      setError("El título es obligatorio.");
      return;
    }
    if (!form.slug.trim()) {
      setError("El slug es obligatorio.");
      return;
    }

    const isDraft = publicar === false;
    const isPublish = publicar === true;

    if (isDraft) setSavingDraft(true);
    else setSaving(true);
    setError(null);

    const payload = {
      titulo: form.titulo.trim(),
      slug: slugify(form.slug),
      extracto: form.extracto.trim() || null,
      contenido: form.contenido || null,
      autor: form.autor.trim() || null,
      categoria: form.categoria.trim() || null,
      tiempo_lectura: form.tiempo_lectura ? parseInt(form.tiempo_lectura) : null,
      imagen_url: form.imagen_url.trim() || null,
      tags: form.tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      publicado: isPublish ? true : isDraft ? false : form.publicado,
      fecha_publicacion: form.fecha_publicacion || null,
    };

    const { error: dbError } = isEditing
      ? await supabase.from("articulos").update(payload).eq("id", articulo.id)
      : await supabase.from("articulos").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      setSavingDraft(false);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-kaizer-border bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="h-8 w-8 flex items-center justify-center rounded-[var(--radius-md)] text-kaizer-muted hover:text-kaizer-light hover:bg-bg-secondary transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-kaizer-white">
            {isEditing ? "Editar artículo" : "Nuevo artículo"}
          </h1>
          {form.publicado && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-600 border border-emerald-200">
              Publicado
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={savingDraft}
            className="px-4 py-2 rounded-[var(--radius-md)] border border-kaizer-border text-kaizer-muted text-sm hover:bg-bg-secondary transition-colors disabled:opacity-60"
          >
            {savingDraft ? "Guardando..." : "Guardar borrador"}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 py-2 rounded-[var(--radius-md)] bg-kaizer-cyan text-white text-sm font-semibold hover:bg-kaizer-cyan-dark transition-colors disabled:opacity-60"
          >
            {saving ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-rose-50 border border-rose-200 text-rose-600 text-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {/* Cuerpo del editor */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] overflow-auto">
        {/* Editor */}
        <div className="p-6 border-r border-kaizer-border overflow-auto">
          <div className="mb-4">
            <input
              value={form.titulo}
              onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
              placeholder="Título del artículo"
              className="w-full text-2xl font-bold text-kaizer-white placeholder:text-kaizer-muted/40 bg-transparent border-none outline-none resize-none"
            />
          </div>

          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-kaizer-muted flex-shrink-0">Slug:</span>
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugManual(true);
                // Permite escribir pero evita caracteres inválidos en tiempo real
                const raw = e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                setForm((f) => ({ ...f, slug: raw }));
              }}
              onBlur={(e) => {
                // Sanitización completa al salir del campo
                setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
              }}
              placeholder="slug-del-articulo"
              className="flex-1 text-xs font-mono text-kaizer-muted bg-bg-secondary border border-kaizer-border rounded-[var(--radius-sm)] px-2 py-1 focus:outline-none focus:border-kaizer-cyan"
            />
          </div>

          <TiptapEditor
            content={form.contenido}
            onChange={(html) => setForm((f) => ({ ...f, contenido: html }))}
          />
        </div>

        {/* Sidebar de metadatos */}
        <div className="p-6 flex flex-col gap-5 overflow-auto bg-bg-secondary/30">
          <div>
            <p className="text-xs font-semibold text-kaizer-muted uppercase tracking-widest mb-3">
              Estado
            </p>
            <FormToggle
              label="Publicado"
              description="Visible en el blog público"
              checked={form.publicado}
              onChange={(v) => setForm((f) => ({ ...f, publicado: v }))}
            />
          </div>

          <div className="border-t border-kaizer-border pt-4">
            <p className="text-xs font-semibold text-kaizer-muted uppercase tracking-widest mb-3">
              Metadatos
            </p>
            <div className="flex flex-col gap-4">
              <FormInput
                label="Autor"
                value={form.autor}
                onChange={(e) => setForm((f) => ({ ...f, autor: e.target.value }))}
                placeholder="Marcos Fernández"
              />
              <FormInput
                label="Categoría"
                value={form.categoria}
                onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
                placeholder="Mantenimiento"
              />
              <FormInput
                label="Tiempo de lectura (min)"
                type="number"
                value={form.tiempo_lectura}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tiempo_lectura: e.target.value }))
                }
              />
              <FormInput
                label="Fecha de publicación"
                type="date"
                value={form.fecha_publicacion}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fecha_publicacion: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="border-t border-kaizer-border pt-4">
            <p className="text-xs font-semibold text-kaizer-muted uppercase tracking-widest mb-3">
              Imagen de portada
            </p>
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
                className="mt-2 w-full h-32 object-cover rounded-[var(--radius-md)] border border-kaizer-border"
              />
            )}
          </div>

          <div className="border-t border-kaizer-border pt-4">
            <p className="text-xs font-semibold text-kaizer-muted uppercase tracking-widest mb-3">
              Extracto
            </p>
            <FormTextarea
              label="Resumen corto"
              value={form.extracto}
              onChange={(e) => setForm((f) => ({ ...f, extracto: e.target.value }))}
              rows={3}
              placeholder="Resumen que aparece en la lista del blog..."
            />
          </div>

          <div className="border-t border-kaizer-border pt-4">
            <p className="text-xs font-semibold text-kaizer-muted uppercase tracking-widest mb-3">
              Etiquetas
            </p>
            <FormInput
              label="Tags (separadas por coma)"
              value={form.tagsStr}
              onChange={(e) => setForm((f) => ({ ...f, tagsStr: e.target.value }))}
              placeholder="soldadura, industria, TIG"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
