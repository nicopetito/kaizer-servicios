// ── Tipos que reflejan exactamente las tablas de Supabase ──

export interface Servicio {
  id: string
  nombre: string
  descripcion: string
  icono: string | null
  etiquetas: string[]
  destacado: boolean
  orden: number
  activo: boolean
  created_at: string
  updated_at: string
}

export interface CategoriaProducto {
  id: number
  nombre: string
}

export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number | null
  material: string | null
  marca: string | null
  categoria_id: number | null
  imagen_url: string | null
  disponible: boolean
  destacado: boolean
  orden: number
  created_at: string
  updated_at: string
  // join
  categorias_producto?: CategoriaProducto | null
}

export interface Articulo {
  id: string
  titulo: string
  slug: string
  extracto: string | null
  contenido: string | null
  autor: string | null
  categoria: string | null
  tiempo_lectura: number | null
  imagen_url: string | null
  tags: string[]
  publicado: boolean
  fecha_publicacion: string | null
  created_at: string
  updated_at: string
}

export interface Empleado {
  id: string
  nombre: string
  apellido: string
  cargo: string
  descripcion: string | null
  foto_url: string | null
  iniciales: string
  linkedin_url: string | null
  orden: number
  activo: boolean
  created_at: string
  updated_at: string
}
