import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

interface SignupData {
  email: string
  password: string
  fullName: string
  birthday: string
  birthTime?: string
  birthLocation: string
  sex: 'male' | 'female' | 'other'
}

export async function POST(request: Request) {
  try {
    const data: SignupData = await request.json()
    
    // Validate required fields
    const requiredFields = ['email', 'password', 'fullName', 'birthday', 'birthLocation', 'sex'] as const
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
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
    
    console.log('Attempting signup with:', { email: data.email })
    
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        data: {
          full_name: data.fullName,
          birth_date: data.birthday,
          birth_time: data.birthTime || null,
          birth_location: data.birthLocation,
          sex: data.sex
        }
      },
    })

    if (authError) {
      console.error('Supabase auth error:', {
        message: authError.message,
        status: authError.status,
        name: authError.name,
        stack: authError.stack,
      })
      return NextResponse.json(
        { 
          error: authError.message,
          details: {
            status: authError.status,
            name: authError.name
          }
        },
        { status: authError.status || 500 }
      )
    }

    if (!authData?.user) {
      return NextResponse.json(
        { error: 'No user data returned from Supabase' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Signup successful',
        user: authData.user 
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
