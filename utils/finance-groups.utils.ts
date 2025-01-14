import { Currency, Finances, IFinanceGroup } from '@/types/types';
import { sortDates } from './date.utils';

export const uniqueGroups = (grouped: IFinanceGroup[]) => {
  return grouped.reduce((acc, group) => {
    if (
      !acc.find((g) => {
        return g.date === group.date;
      })
    ) {
      acc.push(group);
    }
    return acc;
  }, [] as IFinanceGroup[]);
};

export const groupFinancesByDate = (
  finances: Finances[],
  existingGroups: IFinanceGroup[]
): IFinanceGroup[] => {
  const grouped = finances.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const key = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    if (!acc[key]) {
      const existingGroup = existingGroups.find((group) => group.date === key);
      acc[key] = existingGroup
        ? { ...existingGroup, items: [...existingGroup.items] }
        : { date: key, total: 0, items: [] };
    }

    if (!acc[key].items.find((item) => item.id === curr.id)) {
      acc[key].total += curr.price;
      acc[key].items.push({ ...curr });
    }

    return acc;
  }, {} as Record<string, IFinanceGroup>);

  return Object.values(grouped).sort((a, b) => sortDates(a.date, b.date) * -1);
};

export const updateGroupedFinances = (
  grouped: IFinanceGroup[],
  updated: Finances[]
) => {
  return grouped.map((group) => {
    return {
      ...group,
      items: group.items.map((item) => {
        return updated.find((u) => u.id === item.id) || item;
      }),
    };
  });
};

export const transformFinancesFromDB = (finances: any[]) => {
  return finances.map<Finances>((finance) => {
    return {
      ...finance,
      date: new Date(finance.date),
      currency: finance.currency as Currency,
    };
  });
};
