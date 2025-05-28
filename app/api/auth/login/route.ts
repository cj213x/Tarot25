import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    let supabase
    try {
      supabase = createClient()
    } catch (error) {
      console.error('Supabase client error:', error)
      return NextResponse.json(
        { error: 'Configuration error: ' + (error as Error).message },
        { status: 500 }
      )
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', {
        message: error.message,
        status: error.status,
        name: error.name,
      })
      return NextResponse.json(
        { 
          error: error.message,
          details: {
            status: error.status,
            name: error.name
          }
        },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json({
      message: 'Login successful',
      user: data.user,
      session: data.session
    })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
