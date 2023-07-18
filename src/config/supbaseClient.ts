
import { createClient } from '@supabase/supabase-js';
import { EnvConfig } from './EnvConfig';

// Create a single supabase client for interacting with your database
export const supabase = createClient(EnvConfig.SUPABASE_URL, EnvConfig.SUPABASE_ANON_KEY)
