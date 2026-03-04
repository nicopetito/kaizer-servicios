-- ============================================================
-- Kaizer Servicios – Políticas de escritura para el Admin
-- Ejecutar DESPUÉS de schema.sql en el SQL Editor de Supabase
-- NOTA: CREATE POLICY no soporta IF NOT EXISTS en PostgreSQL
-- ============================================================

-- Agrega columna tags a artículos (si no existe)
ALTER TABLE public.articulos ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Actualiza seed con tags
UPDATE public.articulos SET tags = ARRAY['mantenimiento', 'costos', 'producción', 'industria']
  WHERE slug = 'mantenimiento-preventivo-costos';
UPDATE public.articulos SET tags = ARRAY['compresor', 'equipos', 'industria', 'aire comprimido']
  WHERE slug = 'guia-compresor-aire-industrial';
UPDATE public.articulos SET tags = ARRAY['pintura', 'anticorrosión', 'epoxi', 'estructuras']
  WHERE slug = 'pintura-industrial-tecnicas-materiales';
UPDATE public.articulos SET tags = ARRAY['puesta en marcha', 'maquinaria', 'industria', 'instalación']
  WHERE slug = 'puesta-en-marcha-pasos-clave';
UPDATE public.articulos SET tags = ARRAY['soldadura', 'TIG', 'MIG', 'metales']
  WHERE slug = 'soldadura-tig-vs-mig';
UPDATE public.articulos SET tags = ARRAY['seguridad', 'normativa', 'electricidad', 'AEA']
  WHERE slug = 'seguridad-electrica-plantas-normativa-2024';

-- ── Políticas CRUD para usuarios autenticados (admin) ──────

CREATE POLICY "Admin ALL – servicios"
  ON public.servicios FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin ALL – categorias"
  ON public.categorias_producto FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin ALL – productos"
  ON public.productos FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin ALL – articulos"
  ON public.articulos FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin ALL – empleados"
  ON public.empleados FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
