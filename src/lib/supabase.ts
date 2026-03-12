import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// This will catch the error before the client even tries to initialize
if (!PUBLIC_SUPABASE_URL || PUBLIC_SUPABASE_URL === 'undefined') {
    throw new Error("SvelteKit cannot find PUBLIC_SUPABASE_URL. Check your .env file location.");
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);