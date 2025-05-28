import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

interface UpdateProfileData {
  fullName: string
  birthday: string
  birthTime?: string
  birthLocation: string
  sex: 'male' | 'female' | 'other'
}

export async function POST(request: Request) {
  try {
    const supabase = createClient()

    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const data: UpdateProfileData = await request.json()

    // Validate required fields
    const requiredFields = ['fullName', 'birthday', 'birthLocation', 'sex'] as const
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Update user metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        full_name: data.fullName,
        birth_date: data.birthday,
        birth_time: data.birthTime || null,
        birth_location: data.birthLocation,
        sex: data.sex
      }
    })

    if (updateError) {
      console.error('Profile update error:', updateError)
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      data
    })
  } catch (err) {
    console.error('Profile update error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
