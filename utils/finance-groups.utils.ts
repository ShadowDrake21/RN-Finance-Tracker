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
    console.warn('acc', finances);
    const date = new Date(curr.date);
    console.log('groupFinancesByDate', curr.date);
    const key = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    if (!acc[key]) {
      const existingGroup = existingGroups.find((group) => group.date === key);
      console.log('existingGroup', existingGroup?.items);

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
      user_id: curr.user_id,
      date: curr.date,
      name: curr.name,
      price: curr.price,
      image: curr.image,
      type: curr.type,
      icon_type: curr.icon_type,
      currency: curr.currency,
    });
    return acc;
  }, {} as Record<string, IFinanceGroup>);

  return Object.values(grouped);
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
