import { createBrowserClient } from '@supabase/ssr'

// Cliente de browser (usar en Client Components y componentes admin)
// Se llama como función para evitar inicialización en tiempo de módulo (build)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
