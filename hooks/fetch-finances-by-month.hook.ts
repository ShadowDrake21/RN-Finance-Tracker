import { useState, useRef, useEffect } from 'react';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { financeTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import {
  groupFinancesByDate,
  transformFinancesFromDB,
  uniqueGroups,
} from '@/utils/finance-groups.utils';
import { IFinanceGroup } from '@/types/types';
import * as SQLite from 'expo-sqlite';
import { getFinancesByMonth } from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export const useFetchFinancesByMonth = (selectedMonthId: string) => {
  const { userId, getToken } = useAuth();
  const pageRef = useRef(0);
  const [groups, setGroups] = useState<IFinanceGroup[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pageRef.current = 0;
    setGroups([]);
    fetchFinances();
    console.log('selectedMonthId', selectedMonthId);
  }, [selectedMonthId]);

  const fetchFinances = async () => {
    if (!userId) return;

    const token = await getToken({ template: 'supabase' });

    if (!token) return;

    setLoading(true);
    // const finances = await db
    //   .select()
    //   .from(financeTable)
    //   .where(
    //     eq(
    //       sql`strftime('%Y-%m', ${financeTable.date})`,
    //       selectedMonthId.split('-').reverse().join('-')
    //     )
    //   )
    //   .offset(pageRef.current * 10)
    //   .limit(10);

    const finances = await getFinancesByMonth({
      userId,
      token,
      selectedMonthId,
      offset: pageRef.current * 10,
      limit: 10,
    });

    const transformedFinances = transformFinancesFromDB(finances);

    console.log('new finance', transformFinancesFromDB(finances));

    // setGroups((existingGroups) => [
    //   ...uniqueGroups([
    //     ...existingGroups,
    //     ...groupFinancesByDate(transformedFinances, existingGroups),
    //   ]),
    // ]);

    setGroups((existingGroups) => [
      ...groupFinancesByDate(transformedFinances, existingGroups),
    ]);

    setLoading(false);
  };

  const handleLoadMore = () => {
    pageRef.current += 1;
    fetchFinances();
  };

  return { groups, handleLoadMore, loading };
};
