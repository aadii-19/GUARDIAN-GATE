import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,         // don't auto-save session
    autoRefreshToken: false,       // don't auto-refresh tokens
    detectSessionInUrl: false      // avoid parsing URL for session
  }
})
