import { getFinanceById } from '@/supabase/supabase.requests';
import { Finances } from '@/types/types';
import { useAuth } from '@clerk/clerk-expo';
import { useState, useEffect } from 'react';

const useFetchEditFinance = (id: string | undefined, type: string) => {
  const { userId, getToken } = useAuth();
  const [fetchedEditFinance, setFetchedEditFinance] = useState<Finances | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFetchedEditFinance(null);
  }, []);

  useEffect(() => {
    const fetchEditFinance = async () => {
      if (id && type === 'edit') {
        setLoading(true);
        const token = await getToken({ template: 'supabase' });

        if (!userId || !token) return;

        const finance = (
          (await getFinanceById({
            userId,
            token,
            finance_id: +id,
          })) as unknown[]
        )[0] as Finances;

        setFetchedEditFinance(finance);
        setLoading(false);
      }
    };

    fetchEditFinance();
    console.log('fetchedEditFinance', fetchedEditFinance);
  }, [id, type, userId]);

  return { fetchedEditFinance, loading };
};

export default useFetchEditFinance;
