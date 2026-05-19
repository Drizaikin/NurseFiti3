import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/types/database.types';

export const createServerClient = () => {
  return createServerComponentClient<Database>({ cookies });
};

export const createRouteClient = () => {
  return createRouteHandlerClient<Database>({ cookies });
};

// Alias for consistency
export const createClient = createServerClient;
