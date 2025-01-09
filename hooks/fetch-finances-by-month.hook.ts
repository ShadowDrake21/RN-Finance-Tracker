import { useState, useRef, useEffect } from 'react';
import {
  groupFinancesByDate,
  transformFinancesFromDB,
} from '@/utils/finance-groups.utils';
import { IFinanceGroup } from '@/types/types';
import { getFinancesByMonth } from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';
import { calcSum } from '@/utils/helpers.utils';
import { useFinanceStore } from '@/store/useFinanceStore';

export const useFetchFinancesByMonth = (selectedMonthId: string) => {
  const { userId, getToken } = useAuth();
  const pageRef = useRef(0);
  const [groups, setGroups] = useState<IFinanceGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    fetchFinancesByMonth,
    loading: financeLoading,
    error,
    finances,
    setFinances,
  } = useFinanceStore();

  useEffect(() => {
    pageRef.current = 0;
    setGroups([]);
    fetchFinances();
  }, [selectedMonthId]);

  const fetchFinances = async () => {
    if (!userId) return;
    const token = await getToken({ template: 'supabase' });
    if (!token) return;
    setLoading(true);
    const finances = await getFinancesByMonth({
      userId,
      token,
      selectedMonthId,
      offset: pageRef.current * 10,
      limit: 10,
    });

    const transformedFinances = transformFinancesFromDB(finances);

    setGroups((existingGroups) => [
      ...groupFinancesByDate(transformedFinances, existingGroups),
    ]);

    setFinances(transformedFinances);
    console.log('new finances', finances);

    setLoading(false);
  };

  const getFinanceSumByMonth = async ({
    type,
  }: {
    type: 'expense' | 'income';
  }) => {
    if (!userId) return;
    const token = await getToken({ template: 'supabase' });
    if (!token) return;
    setLoading(true);
    const prices = (await getFinancesByMonth({
      userId,
      token,
      selectedMonthId,
      selection: 'price',
    })) as unknown as { price: number }[];

    const sum = calcSum(type, prices);

    setLoading(false);
    return sum;
  };

  const handleLoadMore = () => {
    pageRef.current += 1;
    fetchFinances();
  };

  return {
    groups,
    refreshFinances: fetchFinances,
    handleLoadMore,
    getFinanceSumByMonth,
    loading,
  };
};
