import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  const origin = new URL(request.url).origin
  const response = NextResponse.redirect(new URL('/admin/login', origin), { status: 302 })

  // Eliminar TODAS las cookies de Supabase directamente en la respuesta HTTP
  for (const cookie of allCookies) {
    if (cookie.name.startsWith('sb-')) {
      response.cookies.set(cookie.name, '', {
        maxAge: 0,
        path: '/',
      })
    }
  }

  return response
}

export async function POST(request: Request) {
  return GET(request)
}
