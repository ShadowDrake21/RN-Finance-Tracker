import { useState, useRef, useEffect } from 'react';
import { IFinanceGroup } from '@/types/types';
import { getFinancesByDate } from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';
import {
  groupFinancesByDate,
  transformFinancesFromDB,
} from '@/utils/finance-groups.utils';
import { calcSum } from '@/utils/helpers.utils';

export const useFetchFinancesByDate = (selectedDate: string) => {
  const { userId, getToken } = useAuth();
  const pageRef = useRef(0);
  const [group, setGroup] = useState<IFinanceGroup | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pageRef.current = 0;

    fetchFinances();
  }, [selectedDate]);

  const fetchFinances = async () => {
    if (!userId) return;
    const token = await getToken({ template: 'supabase' });

    if (!token) return;
    setLoading(true);

    const finances = await getFinancesByDate({
      userId,
      token,
      date: new Date(selectedDate).getTime(),
      selection: '*',
    });

    const transformedFinances = transformFinancesFromDB(finances);

    setGroup(groupFinancesByDate(transformedFinances, [])[0]);

    setLoading(false);
  };

  const getFinanceSumByDay = async ({
    type,
  }: {
    type: 'expense' | 'income';
  }) => {
    if (!userId) return;
    const token = await getToken({ template: 'supabase' });
    if (!token) return;
    setLoading(true);
    const prices = (await getFinancesByDate({
      userId,
      token,
      date: new Date(selectedDate).getTime(),
      selection: 'price, type',
    })) as unknown as { price: number }[];

    const sum = calcSum(type, prices);

    setLoading(false);
    return sum;
  };

  return {
    group,
    loading,
    getFinanceSumByDay,
  };
};
