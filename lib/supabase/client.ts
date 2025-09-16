import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://demo.supabase.co" &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0 &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "demo-key"

// Create a singleton instance of the Supabase client for Client Components
// Only create if properly configured, otherwise use null
export const supabase = isSupabaseConfigured ? createClientComponentClient() : null
