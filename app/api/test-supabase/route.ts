import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  try {
    // Simple test query to verify connection
    const { data, error } = await supabase.from('_test').select('*').limit(1)
    
    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ status: 'success', message: 'Supabase connection successful' })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: 'Failed to connect to Supabase' }, { status: 500 })
  }
}
