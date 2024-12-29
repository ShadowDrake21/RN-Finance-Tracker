import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { FinanceCategory } from '@/types/types';

export const incomeItems: FinanceCategory[] = [
  {
    name: 'Unstructured',
    items: [
      { name: 'Business', icon: INCOME_ICONS.business },
      { name: 'Freelance', icon: INCOME_ICONS.freelance },
      { name: 'Gifts', icon: INCOME_ICONS.gifts },
      {
        name: 'Government Assistance',
        icon: INCOME_ICONS.government_assistance,
      },
      { name: 'Investment', icon: INCOME_ICONS.investment },
      { name: 'Other', icon: INCOME_ICONS.other },
      { name: 'Refund', icon: INCOME_ICONS.refund },
      { name: 'Rent', icon: INCOME_ICONS.rent },
      { name: 'Salary', icon: INCOME_ICONS.salary },
      { name: 'Side Hustle', icon: INCOME_ICONS.side_hustle },
    ],
  },
];
