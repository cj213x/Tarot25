'use client'

import { createClient } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        setSession(session)
        setUser(session?.user ?? null)
        setIsAuthenticated(!!session)
      } catch (error) {
        console.error('Auth initialization error:', error)
        setSession(null)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', { event, session })
      
      setSession(session)
      setUser(session?.user ?? null)
      setIsAuthenticated(!!session)
      
      if (event === 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
        setIsAuthenticated(false)
      }
    })

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    session,
    loading,
    isAuthenticated
  }
}
