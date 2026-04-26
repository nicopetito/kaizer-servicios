import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createSupabaseAdmin()
    const { error } = await supabase.from('categorias_producto').select('id').limit(1)

    if (error) throw error

    return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('[keepalive] Error:', error)
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
