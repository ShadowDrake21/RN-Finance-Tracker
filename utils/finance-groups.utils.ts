import { IFinanceGroup } from '@/types/types';

export const uniqueGroups = (grouped: IFinanceGroup[]) => {
  return Object.values(grouped).reduce((acc, group) => {
    if (!acc.find((g) => g.date === group.date)) {
      acc.push(group);
    }
    return acc;
  }, [] as IFinanceGroup[]);
};
