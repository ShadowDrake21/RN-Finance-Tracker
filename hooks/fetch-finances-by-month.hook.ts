import { useState, useRef, useEffect } from 'react';

import {
  groupFinancesByDate,
  transformFinancesFromDB,
} from '@/utils/finance-groups.utils';
import { IFinanceGroup } from '@/types/types';
import * as SQLite from 'expo-sqlite';
import { getFinancesByMonth } from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';

const expo = SQLite.openDatabaseSync('db.db');

export const useFetchFinancesByMonth = (selectedMonthId: string) => {
  const { userId, getToken } = useAuth();
  const pageRef = useRef(0);
  const [groups, setGroups] = useState<IFinanceGroup[]>([]);
  const [loading, setLoading] = useState(false);

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

    const prices = await getFinancesByMonth({
      userId,
      token,
      selectedMonthId,
      selection: 'price',
    });

    const sum = prices.reduce((acc, price) => {
      console.log('prices.reduce', price);
      if (type === 'expense' && price.price < 0) {
        return acc + Math.abs(price.price);
      } else if (type === 'income' && price.price > 0) {
        return acc + price.price;
      }
      return acc;
    }, 0);

    setLoading(false);

    console.log('sum', sum, prices[0].price);
    return sum;
  };

  const handleLoadMore = () => {
    pageRef.current += 1;
    fetchFinances();
  };

  return { groups, handleLoadMore, getFinanceSumByMonth, loading };
};
