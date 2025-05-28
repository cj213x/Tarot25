import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createClient()
    
    // Try to get the session to test the connection
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Supabase connection error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Supabase connection successful',
      config: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    })
  } catch (err) {
    console.error('Test endpoint error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
