import { financeTable } from '@/db/schema';
import { IFinanceGroup } from '@/types/types';

export const uniqueGroups = (grouped: IFinanceGroup[]) => {
  return Object.values(grouped).reduce((acc, group) => {
    if (!acc.find((g) => g.date === group.date)) {
      acc.push(group);
    }
    return acc;
  }, [] as IFinanceGroup[]);
};

export const groupFinancesByDate = (
  finances: (typeof financeTable.$inferSelect)[],
  existingGroups: IFinanceGroup[]
): IFinanceGroup[] => {
  const grouped = finances.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const key = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    if (!acc[key]) {
      const existingGroup = existingGroups.find((group) => group.date === key);
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
