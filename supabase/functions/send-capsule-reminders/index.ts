import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Fetch capsules where unlock_date is today or in the past, but not yet sent
  const { data: capsules, error } = await supabase
    .from('capsules')
    .select('id, email, unlock_date')
    .eq('is_delivered', false)
    .lte('unlock_date', new Date().toISOString())

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

  // Logic to send via Resend would go here...
  
  return new Response(JSON.stringify({ found: capsules.length }), { status: 200 })
})