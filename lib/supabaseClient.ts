import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jrwnyaaocdedsjuoznoa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyd255YWFvY2RlZHNqdW96bm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNjY3OTIsImV4cCI6MjA2Mzk0Mjc5Mn0.Bgb21JA6EQCTbzeKqS45rkM4UcGOgtTTbJYt8XauoY8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
