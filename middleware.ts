import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/error'
]

export async function middleware(request: NextRequest) {
  try {
    // Create a response to modify
    const res = NextResponse.next()
    
    // Create a Supabase client specifically for the middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => request.cookies.get(name)?.value,
          set: (name: string, value: string, options: any) => {
            res.cookies.set(name, value, options)
          },
          remove: (name: string, options: any) => {
            res.cookies.set(name, '', { ...options, maxAge: 0 })
          },
        },
      }
    )
    
    // Refresh session if it exists
    const { data: { session }, error } = await supabase.auth.getSession()
    
    // Get current path
    const path = request.nextUrl.pathname
    
    // For public paths
    if (publicPaths.some(p => path.startsWith(p))) {
      // If logged in and trying to access auth pages, redirect to profile
      if (session && path.startsWith('/auth/')) {
        return NextResponse.redirect(new URL('/profile', request.url))
      }
      return res
    }
    
    // For protected routes
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    
    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/profile/:path*',
    '/auth/:path*',
    '/api/profile/:path*'
  ]
}
