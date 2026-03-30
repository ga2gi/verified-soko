import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

// We fetch these at RUNTIME, not BUILD TIME.
// This prevents the "supabaseUrl is required" error during 'npm run build'.
const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);