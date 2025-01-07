import { PieChartData } from '@/types/types';
import { generateRandomColor } from './helpers.utils';

export const formPieChartData = ({
  fullPrice,
  finance: { name, price, currency },
}: {
  fullPrice: number;
  finance: { name: string; price: number; currency: string };
}): PieChartData[] => {
  return [
    {
      value: fullPrice - Math.abs(price),
      color: generateRandomColor(),
      label: 'Other',
      currency,
    },
    {
      value: Math.abs(price),
      color: generateRandomColor(),
      label: name,
      currency,
    },
  ];
};
