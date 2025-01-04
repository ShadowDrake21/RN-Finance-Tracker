import { financeTable } from '@/db/schema';
import { Currency, Finances, IFinanceGroup } from '@/types/types';

export const uniqueGroups = (grouped: IFinanceGroup[]) => {
  console.log('uniqueGroups', grouped);
  return grouped.reduce((acc, group) => {
    if (
      !acc.find((g) => {
        console.log('!acc.find((g)', g.date, group.date, g.date === group.date);
        return g.date === group.date;
      })
    ) {
      console.log('group', group);
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

  return Object.values(grouped).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const transformFinancesFromDB = (finances: any[]) => {
  return finances.map<Finances>((finance) => {
    console.log(
      'transformFinancesFromDB',
      new Date(finance.date).toISOString()
    );
    return {
      ...finance,
      date: new Date(finance.date),
      currency: finance.currency as Currency,
    };
  });
};
