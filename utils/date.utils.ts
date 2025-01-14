import { MonthScrollItem } from '@/types/types';
import { parse } from 'date-fns';

export const compareDashboardDates = (
  selectedMonthId: string,
  comparedDate: string
): boolean => {
  const [monthStr, yearStr] = selectedMonthId.split('-');
  const selectedMonth = parseInt(monthStr, 10);
  const selectedYear = parseInt(yearStr, 10);
  const [comparedYear, comparedMonth] = comparedDate.split('-').map(Number);

  return selectedYear === comparedYear && selectedMonth === comparedMonth - 1;
};

export const generateMonthData = (creationDate: Date): MonthScrollItem[] => {
  const monthData: MonthScrollItem[] = [];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const creationMonth = creationDate.getMonth();
  const creationYear = creationDate.getFullYear();

  const monthsDifference =
    (currentYear - creationYear) * 12 + (currentMonth - creationMonth);

  for (let i = 0; i <= monthsDifference; i++) {
    const date = new Date(creationYear, creationMonth + i);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    monthData.push({
      id: `${month}-${year}`,
      text: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
    });
  }

  return monthData;
};

export const sortDates = (a: string, b: string) => {
  const dateFormat = 'dd-MM-yyyy';
  const dateA = parse(a, dateFormat, new Date());
  const dateB = parse(b, dateFormat, new Date());

  return dateA.getTime() - dateB.getTime();
};
