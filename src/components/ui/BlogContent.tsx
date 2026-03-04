"use client";

import { useState } from "react";

export interface Articulo {
  id: number;
  titulo: string;
  extracto: string;
  categoria: string;
  autor: string;
  fecha: string;
  tiempoLectura: number;
  imagen: string;
  tags: string[];
}

const CATEGORIA_COLORS: Record<string, string> = {
  Mantenimiento: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Equipos: "text-kaizer-cyan bg-kaizer-cyan/10 border-kaizer-cyan/20",
  Pintura: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Operaciones: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Soldadura: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Normativa: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

function BadgeCategoria({ categoria }: { categoria: string }) {
  const cls =
    CATEGORIA_COLORS[categoria] ??
    "text-kaizer-cyan bg-kaizer-cyan/10 border-kaizer-cyan/20";
  return (
    <span className={`self-start px-2.5 py-0.5 rounded-full text-xs border font-medium ${cls}`}>
      {categoria}
    </span>
  );
}

// ── Sidebar widgets ──────────────────────────────────────────

function WidgetCategorias({
  categorias,
  activa,
  onSelect,
}: {
  categorias: { nombre: string; cantidad: number }[];
  activa: string;
  onSelect: (c: string) => void;
}) {
  return (
    <aside className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface p-5">
      <h3 className="text-sm font-semibold text-kaizer-white uppercase tracking-widest mb-4">
        Categorías
      </h3>
      <ul className="flex flex-col gap-1">
        <li>
          <button
            onClick={() => onSelect("Todas")}
            className={[
              "w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius-sm)] text-sm transition-colors duration-150",
              activa === "Todas"
                ? "bg-kaizer-cyan/15 text-kaizer-cyan"
                : "text-kaizer-muted hover:text-kaizer-light hover:bg-kaizer-border/40",
            ].join(" ")}
          >
            <span>Todas</span>
            <span className="text-xs tabular-nums">
              {categorias.reduce((s, c) => s + c.cantidad, 0)}
            </span>
          </button>
        </li>
        {categorias.map((c) => (
          <li key={c.nombre}>
            <button
              onClick={() => onSelect(c.nombre)}
              className={[
                "w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius-sm)] text-sm transition-colors duration-150",
                activa === c.nombre
                  ? "bg-kaizer-cyan/15 text-kaizer-cyan"
                  : "text-kaizer-muted hover:text-kaizer-light hover:bg-kaizer-border/40",
              ].join(" ")}
            >
              <span>{c.nombre}</span>
              <span className="text-xs tabular-nums">{c.cantidad}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function WidgetRecientes({ articulos }: { articulos: Articulo[] }) {
  const recientes = articulos.slice(0, 4);
  return (
    <aside className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface p-5">
      <h3 className="text-sm font-semibold text-kaizer-white uppercase tracking-widest mb-4">
        Artículos recientes
      </h3>
      <ul className="flex flex-col gap-4">
        {recientes.map((a) => (
          <li key={a.id} className="flex gap-3 group cursor-pointer">
            {/* Miniatura */}
            <div className="h-14 w-14 rounded-[var(--radius-sm)] overflow-hidden flex-shrink-0 bg-kaizer-border/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.imagen}
                alt={a.titulo}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* Info */}
            <div className="flex flex-col gap-1 min-w-0">
              <p className="text-xs text-kaizer-muted leading-snug line-clamp-2 group-hover:text-kaizer-cyan transition-colors duration-150">
                {a.titulo}
              </p>
              <span className="text-xs text-kaizer-muted/60">{a.fecha}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function WidgetTags({
  tags,
  tagActivo,
  onSelect,
}: {
  tags: string[];
  tagActivo: string | null;
  onSelect: (t: string) => void;
}) {
  return (
    <aside className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface p-5">
      <h3 className="text-sm font-semibold text-kaizer-white uppercase tracking-widest mb-4">
        Etiquetas
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={[
              "px-3 py-1 rounded-full text-xs border transition-colors duration-150",
              tagActivo === tag
                ? "bg-kaizer-cyan border-kaizer-cyan text-white"
                : "border-kaizer-border text-kaizer-muted hover:border-kaizer-cyan/50 hover:text-kaizer-light",
            ].join(" ")}
          >
            {tag}
          </button>
        ))}
      </div>
    </aside>
  );
}

// ── Componente principal ─────────────────────────────────────

export default function BlogContent({ articulos }: { articulos: Articulo[] }) {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [tagActivo, setTagActivo] = useState<string | null>(null);

  // Categorías con conteo
  const categorias = Array.from(
    articulos.reduce((map, a) => {
      map.set(a.categoria, (map.get(a.categoria) ?? 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([nombre, cantidad]) => ({ nombre, cantidad }));

  // Tags únicos de todos los artículos
  const allTags = Array.from(new Set(articulos.flatMap((a) => a.tags)));

  // Filtrado: categoría tiene prioridad; tag es secundario
  const filtrados = articulos.filter((a) => {
    const pasaCategoria =
      categoriaActiva === "Todas" || a.categoria === categoriaActiva;
    const pasaTag = tagActivo === null || a.tags.includes(tagActivo);
    return pasaCategoria && pasaTag;
  });

  function handleCategoria(c: string) {
    setCategoriaActiva(c);
    setTagActivo(null); // resetea tag al cambiar categoría
  }

  function handleTag(t: string) {
    setTagActivo((prev) => (prev === t ? null : t)); // toggle
    setCategoriaActiva("Todas");
  }

  return (
    <section aria-label="Contenido del blog" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── Columna principal ─────────────────────────── */}
          <div>
            {/* Encabezado de resultados */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-kaizer-muted">
                {categoriaActiva !== "Todas" ? (
                  <>
                    Categoría:{" "}
                    <strong className="text-kaizer-white">{categoriaActiva}</strong>
                    <button
                      onClick={() => handleCategoria("Todas")}
                      className="ml-2 text-kaizer-cyan hover:underline"
                    >
                      ✕
                    </button>
                  </>
                ) : tagActivo ? (
                  <>
                    Etiqueta:{" "}
                    <strong className="text-kaizer-white">{tagActivo}</strong>
                    <button
                      onClick={() => setTagActivo(null)}
                      className="ml-2 text-kaizer-cyan hover:underline"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  `Mostrando ${filtrados.length} artículos`
                )}
              </p>
            </div>

            {/* Grid de artículos */}
            {filtrados.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filtrados.map((a) => (
                  <article
                    key={a.id}
                    className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface overflow-hidden flex flex-col group cursor-pointer hover:border-kaizer-cyan/30 transition-colors duration-200"
                  >
                    {/* Imagen */}
                    <div className="aspect-video overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.imagen}
                        alt={a.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <BadgeCategoria categoria={a.categoria} />

                      <h2 className="font-semibold text-kaizer-white leading-snug group-hover:text-kaizer-cyan transition-colors duration-150">
                        {a.titulo}
                      </h2>

                      <p className="text-sm text-kaizer-muted leading-relaxed flex-1 line-clamp-3">
                        {a.extracto}
                      </p>

                      {/* Tags del artículo */}
                      <div className="flex flex-wrap gap-1.5">
                        {a.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTag(tag);
                            }}
                            className="px-2 py-0.5 rounded text-xs bg-kaizer-border/50 text-kaizer-muted hover:bg-kaizer-cyan/10 hover:text-kaizer-cyan transition-colors duration-150"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-3 border-t border-kaizer-border text-xs text-kaizer-muted">
                        <span className="flex items-center gap-1.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          {a.autor}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {a.tiempoLectura} min · {a.fecha}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-kaizer-muted">
                No hay artículos para esta selección.
              </div>
            )}
          </div>

          {/* ── Sidebar ───────────────────────────────────── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-20 lg:self-start">
            <WidgetCategorias
              categorias={categorias}
              activa={categoriaActiva}
              onSelect={handleCategoria}
            />
            <WidgetRecientes articulos={articulos} />
            <WidgetTags
              tags={allTags}
              tagActivo={tagActivo}
              onSelect={handleTag}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
