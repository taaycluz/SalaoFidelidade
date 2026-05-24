import { createClient } from '@supabase/supabase-js';

// Puxa as credenciais direto do seu arquivo .env que você acabou de ajustar
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Cria o cliente de conexão
export const supabase = createClient(supabaseUrl, supabaseAnonKey);