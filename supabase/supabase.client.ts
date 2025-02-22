import { createClient } from '@supabase/supabase-js';

export const supabaseClient = async (supabaseToken: string) => {
  const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseToken}`,
        },
      },
    }
  );

  return supabase;
};
