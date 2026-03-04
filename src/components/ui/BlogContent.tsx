"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export interface Articulo {
  id: number | string;
  slug: string;
  titulo: string;
  extracto: string;
  categoria: string;
  autor: string;
  fecha: string;
  tiempoLectura: number;
  imagen: string;
  tags: string[];
}

const CATEGORIA_STYLES: Record<string, string> = {
  Mantenimiento: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Equipos:       "bg-[#E6F9FD] text-[#00C0DE] border-[#00C0DE]/20",
  Pintura:       "bg-violet-50 text-violet-600 border-violet-200",
  Operaciones:   "bg-amber-50 text-amber-600 border-amber-200",
  Soldadura:     "bg-orange-50 text-orange-600 border-orange-200",
  Normativa:     "bg-rose-50 text-rose-600 border-rose-200",
};

function BadgeCategoria({ categoria }: { categoria: string }) {
  const cls = CATEGORIA_STYLES[categoria] ?? "bg-[#E6F9FD] text-[#00C0DE] border-[#00C0DE]/20";
  return (
    <span className={`inline-flex self-start px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {categoria}
    </span>
  );
}

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
    <div className="rounded-2xl border border-[#E4EBF5] bg-white p-5">
      <h3 className="text-xs font-semibold text-[#0A0F1E] uppercase tracking-widest mb-4">
        Categorías
      </h3>
      <ul className="flex flex-col gap-1">
        <li>
          <button
            onClick={() => onSelect("Todas")}
            className={[
              "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-150",
              activa === "Todas"
                ? "bg-[#E6F9FD] text-[#00C0DE] font-medium"
                : "text-[#7A95B0] hover:text-[#0A0F1E] hover:bg-[#F6F9FC]",
            ].join(" ")}
          >
            <span>Todas</span>
            <span className="text-xs tabular-nums bg-[#F6F9FC] px-2 py-0.5 rounded-full">
              {categorias.reduce((s, c) => s + c.cantidad, 0)}
            </span>
          </button>
        </li>
        {categorias.map((c) => (
          <li key={c.nombre}>
            <button
              onClick={() => onSelect(c.nombre)}
              className={[
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-150",
                activa === c.nombre
                  ? "bg-[#E6F9FD] text-[#00C0DE] font-medium"
                  : "text-[#7A95B0] hover:text-[#0A0F1E] hover:bg-[#F6F9FC]",
              ].join(" ")}
            >
              <span>{c.nombre}</span>
              <span className="text-xs tabular-nums bg-[#F6F9FC] px-2 py-0.5 rounded-full">{c.cantidad}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WidgetRecientes({ articulos }: { articulos: Articulo[] }) {
  const recientes = articulos.slice(0, 4);
  return (
    <div className="rounded-2xl border border-[#E4EBF5] bg-white p-5">
      <h3 className="text-xs font-semibold text-[#0A0F1E] uppercase tracking-widest mb-4">
        Recientes
      </h3>
      <ul className="flex flex-col gap-4">
        {recientes.map((a) => (
          <li key={a.id}>
            <Link href={`/blog/${a.slug}`} className="flex gap-3 group">
              <div className="h-12 w-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#F6F9FC]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.imagen}
                  alt={a.titulo}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-xs text-[#3D5068] leading-snug line-clamp-2 group-hover:text-[#00C0DE] transition-colors duration-150">
                  {a.titulo}
                </p>
                <span className="text-xs text-[#7A95B0]">{a.fecha}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
    <div className="rounded-2xl border border-[#E4EBF5] bg-white p-5">
      <h3 className="text-xs font-semibold text-[#0A0F1E] uppercase tracking-widest mb-4">
        Etiquetas
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={[
              "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150",
              tagActivo === tag
                ? "bg-[#00C0DE] border-[#00C0DE] text-white"
                : "border-[#E4EBF5] text-[#7A95B0] bg-white hover:border-[#00C0DE]/40 hover:text-[#0A0F1E]",
            ].join(" ")}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BlogContent({ articulos }: { articulos: Articulo[] }) {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [tagActivo, setTagActivo] = useState<string | null>(null);

  const categorias = Array.from(
    articulos.reduce((map, a) => {
      map.set(a.categoria, (map.get(a.categoria) ?? 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([nombre, cantidad]) => ({ nombre, cantidad }));

  const allTags = Array.from(new Set(articulos.flatMap((a) => a.tags)));

  const filtrados = articulos.filter((a) => {
    const pasaCategoria = categoriaActiva === "Todas" || a.categoria === categoriaActiva;
    const pasaTag = tagActivo === null || a.tags.includes(tagActivo);
    return pasaCategoria && pasaTag;
  });

  function handleCategoria(c: string) {
    setCategoriaActiva(c);
    setTagActivo(null);
  }

  function handleTag(t: string) {
    setTagActivo((prev) => (prev === t ? null : t));
    setCategoriaActiva("Todas");
  }

  const featured = filtrados[0];
  const rest = filtrados.slice(1);

  return (
    <section aria-label="Contenido del blog" className="py-12 bg-[#F6F9FC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">

          {/* Columna principal */}
          <div>
            {/* Estado del filtro */}
            {(categoriaActiva !== "Todas" || tagActivo) && (
              <div className="flex items-center gap-2 mb-5 text-sm text-[#7A95B0]">
                {categoriaActiva !== "Todas" ? (
                  <>
                    Categoría: <strong className="text-[#0A0F1E]">{categoriaActiva}</strong>
                    <button onClick={() => handleCategoria("Todas")} className="ml-1 text-[#00C0DE] hover:underline">✕</button>
                  </>
                ) : tagActivo ? (
                  <>
                    Etiqueta: <strong className="text-[#0A0F1E]">#{tagActivo}</strong>
                    <button onClick={() => setTagActivo(null)} className="ml-1 text-[#00C0DE] hover:underline">✕</button>
                  </>
                ) : null}
              </div>
            )}

            {filtrados.length > 0 ? (
              <div className="flex flex-col gap-6">
                {/* Featured article */}
                {featured && (
                  <Link href={`/blog/${featured.slug}`}>
                    <motion.article
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-[#E4EBF5] bg-white overflow-hidden flex flex-col sm:flex-row group cursor-pointer hover:border-[#00C0DE]/25 hover:shadow-[0_8px_32px_rgba(10,15,30,0.08)] transition-all duration-300"
                    >
                      <div className="aspect-video sm:w-2/5 sm:aspect-auto overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={featured.imagen}
                          alt={featured.titulo}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <BadgeCategoria categoria={featured.categoria} />
                            <span className="text-xs text-[#7A95B0]">Destacado</span>
                          </div>
                          <h2 className="font-bold text-[#0A0F1E] text-xl leading-snug group-hover:text-[#00C0DE] transition-colors duration-200">
                            {featured.titulo}
                          </h2>
                          <p className="text-sm text-[#7A95B0] leading-relaxed line-clamp-3">
                            {featured.extracto}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#7A95B0] pt-3 border-t border-[#F0F4FA]">
                          <span className="flex items-center gap-1.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                            {featured.autor}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                            {featured.tiempoLectura} min · {featured.fecha}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                )}

                {/* Rest of articles */}
                <AnimatePresence mode="popLayout">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {rest.map((a) => (
                      <Link key={a.id} href={`/blog/${a.slug}`}>
                        <motion.article
                          layout
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-2xl border border-[#E4EBF5] bg-white overflow-hidden flex flex-col group cursor-pointer hover:border-[#00C0DE]/25 hover:shadow-[0_6px_24px_rgba(10,15,30,0.07)] transition-all duration-300"
                        >
                          <div className="aspect-video overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={a.imagen}
                              alt={a.titulo}
                              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                            />
                          </div>
                          <div className="p-5 flex flex-col gap-3 flex-1">
                            <BadgeCategoria categoria={a.categoria} />
                            <h2 className="font-semibold text-[#0A0F1E] leading-snug group-hover:text-[#00C0DE] transition-colors duration-200">
                              {a.titulo}
                            </h2>
                            <p className="text-sm text-[#7A95B0] leading-relaxed flex-1 line-clamp-2">
                              {a.extracto}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {a.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleTag(tag); }}
                                  className="px-2 py-0.5 rounded-full text-xs bg-[#F6F9FC] text-[#7A95B0] border border-[#E4EBF5] hover:bg-[#E6F9FD] hover:text-[#00C0DE] hover:border-[#00C0DE]/20 transition-all duration-150 cursor-pointer"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between pt-2.5 border-t border-[#F0F4FA] text-xs text-[#7A95B0]">
                              <span>{a.autor}</span>
                              <span>{a.tiempoLectura} min · {a.fecha}</span>
                            </div>
                          </div>
                        </motion.article>
                      </Link>
                    ))}
                  </div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-20 text-center text-[#7A95B0] rounded-2xl border border-[#E4EBF5] bg-white">
                No hay artículos para esta selección.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <WidgetCategorias categorias={categorias} activa={categoriaActiva} onSelect={handleCategoria} />
            <WidgetRecientes articulos={articulos} />
            <WidgetTags tags={allTags} tagActivo={tagActivo} onSelect={handleTag} />
          </aside>
        </div>
      </div>
    </section>
  );
}
