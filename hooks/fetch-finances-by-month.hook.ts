import { useState, useRef, useEffect } from 'react';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { financeTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import {
  groupFinancesByDate,
  uniqueGroups,
} from '@/utils/finance-groups.utils';
import { IFinanceGroup } from '@/types/types';
import * as SQLite from 'expo-sqlite';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export const useFetchFinancesByMonth = (selectedMonthId: string) => {
  const pageRef = useRef(0);
  const [groups, setGroups] = useState<IFinanceGroup[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pageRef.current = 0;
    setGroups([]);
    fetchFinances();
  }, [selectedMonthId]);

  const fetchFinances = async () => {
    setLoading(true);
    const finances = await db
      .select()
      .from(financeTable)
      .where(
        eq(
          sql`strftime('%Y-%m', ${financeTable.date})`,
          selectedMonthId.split('-').reverse().join('-')
        )
      )
      .offset(pageRef.current * 10)
      .limit(10);

    setGroups((existingGroups) => [
      ...uniqueGroups([
        ...existingGroups,
        ...groupFinancesByDate(finances, existingGroups),
      ]),
    ]);

    setLoading(false);
  };

  const handleLoadMore = () => {
    pageRef.current += 1;
    fetchFinances();
  };

  return { groups, handleLoadMore, loading };
};
