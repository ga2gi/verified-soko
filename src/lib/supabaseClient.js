import { createClient } from '@supabase/supabase-js';

// Hardcoding these ensures Vercel sees them perfectly during the 'transforming' stage
const supabaseUrl = 'https://oltwhwgbufarjvqsyzjq.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sdHdod2didWZhcmp2cXN5empxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0OTU0NDYsImV4cCI6MjA4NzA3MTQ0Nn0.PpeptTunUNQi-2U_88V-5KtiU6inZ7f_ACRTPboivxE'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);