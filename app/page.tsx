'use client'

import Image from "next/image";
import { useAuth } from '@/app/hooks/useAuth'
import { createClient } from '@/lib/supabase'
import { HoroscopeForm } from '@/components/horoscope/HoroscopeForm'

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth()
  
  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Tarot25</h1>
          <p className="text-gray-600 mb-8">Please log in to continue</p>
          <a
            href="/auth/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Log In
          </a>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Tarot25</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sign Out
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Profile</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email verified:</span>{' '}
                {user?.user_metadata.email_verified ? 'Yes' : 'No'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">User ID:</span> {user?.id}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Get Your Tarot Reading</h2>
            <HoroscopeForm />
          </div>
        </div>
      </div>
    </main>
  )
}
