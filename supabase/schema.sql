-- ============================================================
-- Kaizer Servicios – Schema Supabase
-- Ejecutar en el SQL Editor de tu proyecto Supabase
-- ============================================================

-- ── EXTENSIONES ─────────────────────────────────────────────
create extension if not exists "uuid-ossp";


-- ── TABLA: servicios ────────────────────────────────────────
create table if not exists public.servicios (
  id           uuid        primary key default gen_random_uuid(),
  nombre       text        not null,
  descripcion  text        not null,
  -- Nombre de un ícono (e.g. "paint", "wrench") o ruta SVG
  icono        text,
  -- Etiquetas separadas por coma o array de texto
  etiquetas    text[]      default '{}',
  destacado    boolean     not null default false,
  orden        int         not null default 0,
  activo       boolean     not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.servicios is
  'Servicios industriales ofrecidos por Kaizer Servicios.';


-- ── TABLA: categorias_producto ──────────────────────────────
-- Tabla normalizada para las categorías del catálogo
create table if not exists public.categorias_producto (
  id     serial      primary key,
  nombre text        not null unique   -- e.g. 'Equipos', 'Herramientas'
);

insert into public.categorias_producto (nombre) values
  ('Equipos'),
  ('Herramientas'),
  ('Insumos'),
  ('Repuestos')
on conflict (nombre) do nothing;


-- ── TABLA: productos ────────────────────────────────────────
create table if not exists public.productos (
  id           uuid        primary key default gen_random_uuid(),
  nombre       text        not null,
  descripcion  text        not null,
  precio       numeric(12, 2),
  material     text,
  marca        text,
  categoria_id int         references public.categorias_producto (id) on delete set null,
  imagen_url   text,
  disponible   boolean     not null default true,
  destacado    boolean     not null default false,
  orden        int         not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.productos is
  'Catálogo de productos y equipos industriales.';
comment on column public.productos.precio    is 'Precio en pesos argentinos (ARS).';
comment on column public.productos.material  is 'Material principal de construcción.';


-- ── TABLA: articulos ────────────────────────────────────────
create table if not exists public.articulos (
  id                  uuid        primary key default gen_random_uuid(),
  titulo              text        not null,
  slug                text        not null unique,
  extracto            text,
  contenido           text,                        -- Markdown o HTML
  autor               text,
  categoria           text,
  tiempo_lectura      int,                         -- minutos estimados
  imagen_url          text,
  publicado           boolean     not null default false,
  fecha_publicacion   timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.articulos is
  'Artículos del blog de Kaizer Servicios.';
comment on column public.articulos.slug           is 'Identificador URL-friendly único.';
comment on column public.articulos.tiempo_lectura is 'Tiempo estimado de lectura en minutos.';


-- ── TABLA: empleados ────────────────────────────────────────
create table if not exists public.empleados (
  id           uuid        primary key default gen_random_uuid(),
  nombre       text        not null,
  apellido     text        not null,
  cargo        text        not null,
  descripcion  text,
  foto_url     text,
  iniciales    text        generated always as (upper(left(nombre, 1) || left(apellido, 1))) stored,
  linkedin_url text,
  orden        int         not null default 0,
  activo       boolean     not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.empleados is
  'Integrantes del equipo de Kaizer Servicios.';


-- ── TRIGGER: actualizar updated_at automáticamente ──────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_servicios_updated_at
  before update on public.servicios
  for each row execute procedure public.set_updated_at();

create trigger trg_productos_updated_at
  before update on public.productos
  for each row execute procedure public.set_updated_at();

create trigger trg_articulos_updated_at
  before update on public.articulos
  for each row execute procedure public.set_updated_at();

create trigger trg_empleados_updated_at
  before update on public.empleados
  for each row execute procedure public.set_updated_at();


-- ── ROW LEVEL SECURITY (RLS) ─────────────────────────────────
-- Lectura pública para todas las tablas de contenido
alter table public.servicios          enable row level security;
alter table public.categorias_producto enable row level security;
alter table public.productos          enable row level security;
alter table public.articulos          enable row level security;
alter table public.empleados          enable row level security;

-- Políticas de lectura anónima (para el frontend público)
create policy "Lectura pública – servicios"
  on public.servicios for select using (activo = true);

create policy "Lectura pública – categorias"
  on public.categorias_producto for select using (true);

create policy "Lectura pública – productos"
  on public.productos for select using (disponible = true);

create policy "Lectura pública – articulos"
  on public.articulos for select using (publicado = true);

create policy "Lectura pública – empleados"
  on public.empleados for select using (activo = true);


-- ── ÍNDICES ──────────────────────────────────────────────────
create index if not exists idx_productos_categoria on public.productos (categoria_id);
create index if not exists idx_articulos_slug      on public.articulos  (slug);
create index if not exists idx_articulos_fecha     on public.articulos  (fecha_publicacion desc);
create index if not exists idx_empleados_orden     on public.empleados  (orden);


-- ── SEED: datos de ejemplo ──────────────────────────────────
-- Servicios
insert into public.servicios (nombre, descripcion, etiquetas, destacado, orden) values
  ('Pintura Industrial',
   'Aplicamos recubrimientos anticorrosivos, esmaltes sintéticos y pinturas epoxi sobre estructuras metálicas, maquinaria pesada y naves industriales.',
   array['Anticorrosivos','Epoxi bicomponente','Airless'], true, 1),
  ('Reparación de Equipos',
   'Diagnóstico y reparación integral de equipos industriales: motores eléctricos, reductores, bombas y compresores.',
   array['Motores','Bombas','Compresores'], true, 2),
  ('Puesta en Marcha',
   'Instalación, calibración y verificación de maquinaria industrial nueva o trasladada.',
   array['Instalación','Calibración','Capacitación'], true, 3),
  ('Mantenimiento Preventivo',
   'Planes de mantenimiento periódico a medida para prolongar la vida útil de los equipos.',
   array['Planes periódicos','Lubricación','Inspección'], false, 4),
  ('Instalación Eléctrica Industrial',
   'Montaje de tableros de control, cableado de fuerza y sistemas de automatización industrial.',
   array['Tableros','Automatización','Normativa AEA'], false, 5),
  ('Soldadura Industrial',
   'Soldadura MIG/MAG, TIG y electrodo revestido en acero, inoxidable y aluminio.',
   array['MIG/MAG','TIG','Inoxidable'], false, 6)
on conflict do nothing;

-- Productos
insert into public.productos (nombre, descripcion, precio, material, marca, categoria_id, imagen_url, disponible, destacado, orden)
select
  p.nombre, p.descripcion, p.precio, p.material, p.marca,
  c.id, p.imagen_url, p.disponible, p.destacado, p.orden
from (values
  ('Compresor de Aire 500 L',
   'Compresor de pistón de doble etapa con calderín de 500 L. Ideal para cabinas de pintura.',
   1850000, 'Acero con recubrimiento epoxi', 'Schulz',
   'Equipos', 'https://picsum.photos/seed/compressor-air/400/400', true, true, 1),
  ('Soldadora MIG/MAG 250 A',
   'Soldadora inverter multifunción con alimentador de hilo integrado. Apta para acero e inoxidable.',
   620000, 'Chasis de acero con frontal de aluminio', 'Lincoln Electric',
   'Equipos', 'https://picsum.photos/seed/welder-mig/400/400', true, true, 2),
  ('Amoladora Angular 9"',
   'Amoladora de gran formato 2.400 W, 6.500 RPM. Incluye protector ajustable.',
   95000, 'Aleación de aluminio y policarbonato', 'DeWalt',
   'Herramientas', 'https://picsum.photos/seed/angle-grinder/400/400', true, false, 3),
  ('Taladro Percutor 1.050 W',
   'Taladro de impacto con mandril de 13 mm, velocidad variable, reversa y percusión.',
   58000, 'Policarbonato reforzado con fibra de vidrio', 'Bosch',
   'Herramientas', 'https://picsum.photos/seed/drill-bosch/400/400', true, false, 4),
  ('Generador Diesel 7,5 kVA',
   'Grupo electrógeno monofásico silencioso, 8 hs de autonomía, arranque eléctrico.',
   980000, 'Estructura de acero tratado anticorrosión', 'Mpower',
   'Equipos', 'https://picsum.photos/seed/diesel-generator/400/400', true, true, 5),
  ('Kit Pintura Airless Profesional',
   'Equipo airless con pistola, manguera 15 m y filtro de línea. Presión hasta 210 bar.',
   340000, 'Polipropileno y acero inoxidable', 'Graco',
   'Insumos', 'https://picsum.photos/seed/airless-paint/400/400', true, false, 6),
  ('Esmeril de Banco 6"',
   'Esmeril doble 370 W, muela de óxido de aluminio + cepillo de alambre. Base de hierro fundido.',
   42000, 'Hierro fundido y acero', 'Black & Decker',
   'Herramientas', 'https://picsum.photos/seed/bench-grinder/400/400', true, false, 7),
  ('Cortadora de Plasma 40 A',
   'Corte por plasma inverter. Corta acero hasta 12 mm, aluminio hasta 8 mm.',
   285000, 'Aluminio anodizado y ABS de alta resistencia', 'Yeswelder',
   'Equipos', 'https://picsum.photos/seed/plasma-cutter/400/400', true, false, 8),
  ('Kit Discos de Corte (25 u.)',
   'Pack de discos 115 mm para acero inoxidable y hierro. Vida útil extendida.',
   12500, 'Corindón con malla de fibra de vidrio', 'Norton',
   'Insumos', 'https://picsum.photos/seed/cutting-discs/400/400', true, false, 9),
  ('Rodamiento SKF 6205 (x10)',
   'Rodamientos sellados 25×52×15 mm para motores, bombas y reductores.',
   18000, 'Acero cromo-níquel con jaula de poliamida', 'SKF',
   'Repuestos', 'https://picsum.photos/seed/bearing-skf/400/400', true, false, 10),
  ('Junta Plana Universal 1 m²',
   'Plancha de fibra prensada resistente a aceites y vapor. Temp. máx. 350 °C.',
   9800, 'Fibra prensada con aglutinante NBR', 'Klinger',
   'Repuestos', 'https://picsum.photos/seed/gasket-sheet/400/400', true, false, 11),
  ('Taladro de Columna 16 mm',
   '5 velocidades (180–2.850 RPM), mesa inclinable ±45°, profundidad 100 mm.',
   165000, 'Hierro fundido y acero inoxidable', 'Metabo',
   'Herramientas', 'https://picsum.photos/seed/column-drill/400/400', false, false, 12)
) as p(nombre, descripcion, precio, material, marca, cat_nombre, imagen_url, disponible, destacado, orden)
join public.categorias_producto c on c.nombre = p.cat_nombre
on conflict do nothing;

-- Artículos
insert into public.articulos (titulo, slug, extracto, autor, categoria, tiempo_lectura, imagen_url, publicado, fecha_publicacion) values
  ('Mantenimiento preventivo: cómo reducir costos en tu planta',
   'mantenimiento-preventivo-costos',
   'Un plan bien diseñado puede reducir hasta un 30 % los costos operativos y eliminar paradas inesperadas.',
   'Marcos Fernández', 'Mantenimiento', 8,
   'https://picsum.photos/seed/maintenance-plant/800/450',
   true, '2025-02-12'::timestamptz),
  ('Guía completa para elegir un compresor de aire industrial',
   'guia-compresor-aire-industrial',
   'Caudal, presión, calderín y lubricación: todo lo que debés evaluar antes de invertir.',
   'Diego Peralta', 'Equipos', 12,
   'https://picsum.photos/seed/industrial-compressor/800/450',
   true, '2025-01-28'::timestamptz),
  ('Pintura industrial: técnicas y materiales para ambientes agresivos',
   'pintura-industrial-tecnicas-materiales',
   'La selección correcta del sistema de pintura puede marcar la diferencia entre 2 y 10 años de durabilidad.',
   'Carlos Rodríguez', 'Pintura', 6,
   'https://picsum.photos/seed/industrial-painting/800/450',
   true, '2025-01-15'::timestamptz),
  ('Puesta en marcha de maquinaria: los 5 pasos clave',
   'puesta-en-marcha-pasos-clave',
   'Instalar maquinaria va más allá de conectar cables. Te contamos el protocolo completo.',
   'Laura Martínez', 'Operaciones', 7,
   'https://picsum.photos/seed/machine-startup/800/450',
   true, '2025-01-03'::timestamptz),
  ('Soldadura TIG vs MIG: ¿cuál es mejor para tu proyecto?',
   'soldadura-tig-vs-mig',
   'Comparamos velocidad, precisión, costo y materiales compatibles para ayudarte a decidir.',
   'Diego Peralta', 'Soldadura', 9,
   'https://picsum.photos/seed/tig-mig-welding/800/450',
   true, '2024-12-18'::timestamptz),
  ('Seguridad eléctrica en plantas industriales: normativa 2024',
   'seguridad-electrica-plantas-normativa-2024',
   'AEA y Ley 19.587: los puntos críticos que toda empresa industrial debe cumplir.',
   'Valeria Sosa', 'Normativa', 10,
   'https://picsum.photos/seed/electrical-safety/800/450',
   true, '2024-12-05'::timestamptz)
on conflict (slug) do nothing;

-- Empleados
insert into public.empleados (nombre, apellido, cargo, descripcion, linkedin_url, orden) values
  ('Carlos',   'Rodríguez', 'Director General',
   'Más de 15 años en el sector industrial. Fundó Kaizer con la visión de combinar servicio personalizado y tecnología de punta.',
   'https://linkedin.com', 1),
  ('Laura',    'Martínez',  'Gerente de Operaciones',
   'Ingeniera Industrial (UTN Mar del Plata). Coordina proyectos de campo y garantiza entregas en tiempo y forma.',
   'https://linkedin.com', 2),
  ('Marcos',   'Fernández', 'Jefe Técnico',
   'Electromecánico especializado en automatización. Referente del equipo para diagnósticos complejos y puestas en marcha.',
   'https://linkedin.com', 3),
  ('Valeria',  'Sosa',      'Administración y Finanzas',
   'Contadora Pública. Gestiona presupuestos, facturación y el cumplimiento fiscal de la empresa.',
   'https://linkedin.com', 4),
  ('Diego',    'Peralta',   'Técnico Senior – Soldadura',
   'Soldador certificado con 10+ años en estructuras industriales, MIG/MAG y TIG sobre inoxidable y aluminio.',
   'https://linkedin.com', 5),
  ('Florencia', 'Ruiz',     'Atención al Cliente',
   'Analista comercial. Primera línea de contacto con clientes, coordina presupuestos y seguimiento de proyectos.',
   'https://linkedin.com', 6)
on conflict do nothing;
