import { useFinanceStore } from '@/store/useFinanceStore';
import { deleteFinance } from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';
import { useState } from 'react';

const useDeleteFinance = ({
  id,
  image,
}: {
  id: number;
  image: string | null;
}) => {
  const { userId, getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const { deleteFinance: deleteFinanceFromStore } = useFinanceStore();

  const onDelete = async () => {
    setLoading(true);
    const token = await getToken({ template: 'supabase' });
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    const deletedStatus = await deleteFinance({
      userId,
      token,
      financeId: id,
      financeImage: image,
    });

    deleteFinanceFromStore(id);
    setLoading(false);

    console.log('deletedStatus', deletedStatus);
  };

  return { onDelete, loading };
};

export default useDeleteFinance;
