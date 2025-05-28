import { createBrowserClient } from '@supabase/ssr'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  if (supabaseInstance) return supabaseInstance

  supabaseInstance = createBrowserClient(supabaseUrl, supabaseKey)

  // Just log auth state changes, don't handle redirects here
  supabaseInstance.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
    console.log('Auth state changed:', { event, session })
  })

  return supabaseInstance
}
