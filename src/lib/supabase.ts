import { createClient } from '@supabase/supabase-js';
import { DATABASE_CONFIG } from '../config/database';

export const supabase = createClient(
  DATABASE_CONFIG.supabaseUrl,
  DATABASE_CONFIG.supabaseAnonKey
);