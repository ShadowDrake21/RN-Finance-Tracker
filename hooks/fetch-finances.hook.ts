import { useState, useRef, useEffect } from 'react';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { financeTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { uniqueGroups } from '@/utils/finance-groups.utils';
import { IFinanceGroup } from '@/types/types';
import * as SQLite from 'expo-sqlite';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export const useFetchFinances = (selectedMonthId: string) => {
  const pageRef = useRef(0);
  const [groups, setGroups] = useState<IFinanceGroup[]>([]);

  useEffect(() => {
    pageRef.current = 0;
    setGroups([]);
    fetchFinances();
  }, [selectedMonthId]);

  const fetchFinances = async () => {
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
  };

  const handleLoadMore = () => {
    pageRef.current += 1;
    fetchFinances();
  };

  const groupFinancesByDate = (
    finances: (typeof financeTable.$inferSelect)[],
    existingGroups: IFinanceGroup[]
  ): IFinanceGroup[] => {
    const grouped = finances.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const key = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      if (!acc[key]) {
        const existingGroup = existingGroups.find(
          (group) => group.date === key
        );
        if (existingGroup) {
          acc[key] = existingGroup;
        } else {
          acc[key] = {
            date: key,
            total: 0,
            items: [],
          };
        }
      }
      acc[key].total += curr.price;
      acc[key].items.push({
        id: curr.id,
        name: curr.name,
        description: curr.description!,
        price: curr.price,
        iconType: curr.iconType,
      });
      return acc;
    }, {} as Record<string, IFinanceGroup>);

    return Object.values(grouped);
  };

  return { groups, handleLoadMore };
};
