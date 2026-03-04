"use client";

import { useState } from "react";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  material: string;
  marca: string;
  categoria: "Equipos" | "Herramientas" | "Insumos" | "Repuestos";
  imagen: string;
  disponible: boolean;
}

const CATEGORIAS = ["Todos", "Equipos", "Herramientas", "Insumos", "Repuestos"] as const;

function formatPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CatalogoGrid({ productos }: { productos: Producto[] }) {
  const [categoriaActiva, setCategoriaActiva] = useState<string>("Todos");

  const filtrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <>
      {/* ── Filtros ── */}
      <section
        aria-label="Filtros de catálogo"
        className="py-6 border-b border-kaizer-border bg-kaizer-surface/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={[
                  "px-4 py-1.5 rounded-full text-sm border transition-colors duration-150",
                  cat === categoriaActiva
                    ? "bg-kaizer-cyan border-kaizer-cyan text-white"
                    : "bg-transparent border-kaizer-border text-kaizer-muted hover:border-kaizer-cyan/50 hover:text-kaizer-light",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid de productos ── */}
      <section aria-label="Productos" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtrados.map((p) => (
              <article
                key={p.id}
                className="rounded-[var(--radius-lg)] border border-kaizer-border bg-kaizer-surface overflow-hidden flex flex-col hover:border-kaizer-cyan/40 transition-colors duration-200 group"
              >
                {/* Imagen */}
                <div className="aspect-square bg-kaizer-border/20 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!p.disponible && (
                    <div className="absolute inset-0 bg-kaizer-dark/70 flex items-center justify-center">
                      <span className="text-kaizer-muted text-sm font-medium">Sin stock</span>
                    </div>
                  )}
                  {/* Badge de categoría */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs bg-kaizer-dark/80 border border-kaizer-border text-kaizer-muted">
                    {p.categoria}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-kaizer-muted">{p.marca}</span>
                    <h3 className="font-semibold text-kaizer-white leading-snug">
                      {p.nombre}
                    </h3>
                  </div>

                  <p className="text-xs text-kaizer-muted leading-relaxed flex-1">
                    {p.descripcion}
                  </p>

                  {/* Material */}
                  <div className="flex items-center gap-1.5 text-xs text-kaizer-muted">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 flex-shrink-0">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>Material: <strong className="text-kaizer-light">{p.material}</strong></span>
                  </div>

                  {/* Precio */}
                  <div className="pt-2 border-t border-kaizer-border">
                    <p className="text-kaizer-cyan font-bold text-lg">
                      {formatPrecio(p.precio)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtrados.length === 0 && (
            <p className="text-center text-kaizer-muted py-16">
              No hay productos en esta categoría todavía.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
