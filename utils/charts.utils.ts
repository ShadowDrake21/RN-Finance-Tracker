import { PieChartData } from '@/types/types';
import { generateRandomColor } from './helpers.utils';

export const formPieChartData = ({
  fullPrice,
  finance: { name, price },
}: {
  fullPrice: number;
  finance: { name: string; price: number };
}): PieChartData[] => {
  return [
    {
      value: fullPrice - Math.abs(price),
      color: generateRandomColor(),
      label: 'Other',
    },
    {
      value: Math.abs(price),
      color: generateRandomColor(),
      label: name,
    },
  ];
};
