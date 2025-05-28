'use client'

import Link from 'next/link'
import { useAuth } from '@/app/hooks/useAuth'
import { createClient } from '@/lib/supabase'

export default function Header() {
  const { user, isAuthenticated } = useAuth()

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      // Let the middleware handle the redirect
      window.location.reload()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="w-full bg-gradient-to-r from-purple-900 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-90">🔮 TarotAI</Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/profile" 
                  className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login"
                  className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/signup"
                  className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
