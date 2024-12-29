import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { FinanceCategory } from '@/types/types';

export const incomeItems: FinanceCategory[] = [
  {
    name: 'unstructured',
    type: 'income',
    items: [
      { name: 'Business', icon: 'business' },
      { name: 'Freelance', icon: 'freelance' },
      { name: 'Gifts', icon: 'gifts' },
      {
        name: 'Government Assistance',
        icon: 'government_assistance',
      },
      { name: 'Investment', icon: 'investment' },
      { name: 'Other', icon: 'other' },
      { name: 'Refund', icon: 'refund' },
      { name: 'Rent', icon: 'rent' },
      { name: 'Salary', icon: 'salary' },
      { name: 'Side Hustle', icon: 'side_hustle' },
    ],
  },
];
