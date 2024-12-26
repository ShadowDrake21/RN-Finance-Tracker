import { useState, useRef, useEffect } from 'react';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { financeTable } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { uniqueGroups } from '@/utils/finance-groups.utils';
import { IFinanceGroup, IFinanceItemAction } from '@/types/types';
import * as SQLite from 'expo-sqlite';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export const useFetchFinancesByDate = (selectedDate: string) => {
  const pageRef = useRef(0);
  const [items, setItems] = useState<(typeof financeTable.$inferSelect)[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pageRef.current = 0;
    // setItems([]);
    fetchFinances();
  }, [selectedDate]);

  const fetchFinances = async () => {
    setLoading(true);

    const finances = await db
      .select()
      .from(financeTable)
      .where(sql`${financeTable.date} = ${selectedDate}`);
    setItems(finances);

    setLoading(false);
  };

  return {
    items,
    loading,
    total: items.reduce((acc, item) => {
      return acc + item.price;
    }, 0),
  };
};
