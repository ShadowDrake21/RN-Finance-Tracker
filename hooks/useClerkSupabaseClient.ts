// import { useFinanceForm } from '@/contexts/FinanceFormContext';
// import { Finances } from '@/types/types';
// import { useSession, useUser } from '@clerk/clerk-expo';
// import { createClient } from '@supabase/supabase-js';
// import { useEffect, useState } from 'react';

// export const useClerkSupabaseClient = () => {
//   const { session } = useSession();
//   const { user } = useUser();
//   const { financeForm, isFormValid } = useFinanceForm();

//   useEffect(() => {
//     const funct = async () => {
//       const clerkToken = await session?.getToken({ template: 'supabase' });
//       console.log('Clerk Token:', clerkToken);
//     };
//     funct();
//   }, []);

//   const client = createClient(
//     process.env.EXPO_PUBLIC_SUPABASE_URL!,
//     process.env.EXPO_PUBLIC_SUPABASE_KEY!,
//     {
//       global: {
//         // Get the custom Supabase token from Clerk
//         fetch: async (url, options = {}) => {
//           const clerkToken = await session?.getToken({
//             template: 'supabase',
//           });
//           console.log('Clerk Token:', clerkToken);
//           // Insert the Clerk Supabase token into the headers
//           const headers = new Headers(options?.headers);
//           headers.set('Authorization', `Bearer ${clerkToken}`);

//           // Now call the default fetch
//           return fetch(url, {
//             ...options,
//             headers,
//           });
//         },
//       },
//     }
//   );

//   const [loading, setLoading] = useState(false);
//   const [finances, setFinances] = useState<any[]>([]);

//   useEffect(() => {
//     if (!user) return;

//     async function loadFinances() {
//       setLoading(true);
//       const { data, error } = await client.from('finances').select();
//       if (!error) setFinances(data);
//       setLoading(false);
//     }

//     loadFinances();
//   }, [user, client]);

//   const createFinance = async () => {
//     if (!financeForm || !isFormValid()) return;
//     console.log('Creating finance', financeForm, client);
//     await client
//       .from('finances')
//       .insert<Finances>({
//         name: financeForm.note,
//         icon_type: financeForm.kind,
//         type: financeForm.type,
//         price: financeForm.sum ?? 0,
//         image: financeForm.image,
//         date: financeForm.date,
//       })
//       .then(() => {
//         console.log('Finance created');
//       });
//   };

//   return { client, finances, loading, createFinance };
// };
