import { getFinanceById } from '@/supabase/supabase.requests';
import { downloadImage } from '@/supabase/supabase.storage';
import { Finances } from '@/types/types';
import { transformFinancesFromDB } from '@/utils/finance-groups.utils';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';

const useFetchFinanceById = (id: string) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [finance, setFinance] = useState<Finances>();
  const [loading, setLoading] = useState(false);

  const fetchFinance = useCallback(async () => {
    setLoading(true);

    if (!user) {
      setLoading(false);
      return;
    }

    const token = await getToken({ template: 'supabase' });

    if (!token) {
      setLoading(false);
      return;
    }

    const transformedFinance = transformFinancesFromDB(
      await getFinanceById({
        userId: user?.id,
        token: token,
        finance_id: isNaN(+id) ? 0 : +id,
      })
    )[0];

    const downloadedImageUrl = transformedFinance.image
      ? await downloadImage({
          user_id: user.id,
          token,
          imagePath: transformedFinance.image,
        })
      : null;

    setFinance({ ...transformedFinance, image: downloadedImageUrl });
    setLoading(false);
  }, [id, user, getToken]);

  useEffect(() => {
    fetchFinance();
  }, [fetchFinance]);

  return { finance, loading };
};

export default useFetchFinanceById;
