import { useState, useRef, useEffect } from 'react';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { financeTable } from '@/db/schema';
import { sql } from 'drizzle-orm';
import * as SQLite from 'expo-sqlite';
import { Finances, IFinanceGroup } from '@/types/types';
import { getFinancesByDate } from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';
import {
  groupFinancesByDate,
  transformFinancesFromDB,
} from '@/utils/finance-groups.utils';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

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

  return {
    group,
    loading,
  };
};
