import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/database.types';

/**
 * Supabase admin client — uses the service role key.
 * ONLY use this in server-side API routes, never in client components.
 * Has full database access and bypasses RLS.
 */
export const createAdminClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
