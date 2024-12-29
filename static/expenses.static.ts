import { FinanceCategory } from '@/types/types';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';

export const expensesItems: FinanceCategory[] = [
  {
    name: 'essentials',
    type: 'expense',
    items: [
      { name: 'Groceries', icon: 'groceries' },
      { name: 'Housing', icon: 'housing' },
      { name: 'Insurance', icon: 'insurance' },
      { name: 'Rent', icon: 'rent' },
      { name: 'Utilities', icon: 'utilities' },
    ],
  },
  {
    name: 'education',
    type: 'expense',
    items: [
      { name: 'Books', icon: 'books' },
      { name: 'Education', icon: 'education' },
      { name: 'Online Learning', icon: 'online_learning' },
    ],
  },
  {
    name: 'entertainment',
    type: 'expense',
    items: [
      { name: 'Events', icon: 'events' },
      { name: 'Gaming', icon: 'gaming' },
      { name: 'Hobbies', icon: 'hobbies' },
      { name: 'Hotel', icon: 'hotel' },
      { name: 'Streaming Services', icon: 'streaming_services' },
    ],
  },
  {
    name: 'family and relationships',
    type: 'expense',
    items: [
      { name: 'Childcare', icon: 'childcare' },
      { name: 'Family Care', icon: 'family_care' },
      { name: 'Pets', icon: 'pets' },
      { name: 'Relationship', icon: 'relationship' },
    ],
  },
  {
    name: 'financial obligations',
    type: 'expense',
    items: [
      { name: 'Investments', icon: 'investments' },
      { name: 'Loan', icon: 'loan' },
      { name: 'Tax', icon: 'tax' },
    ],
  },
  {
    name: 'food and dining',
    type: 'expense',
    items: [
      { name: 'Alcohol', icon: 'alcohol' },
      { name: 'Candies', icon: 'candies' },
      { name: 'Coffee', icon: 'coffee' },
      { name: 'Restaurant', icon: 'restaurant' },
    ],
  },
  {
    name: 'health and wellness',
    type: 'expense',
    items: [
      { name: 'Fitness', icon: 'fitness' },
      { name: 'Health', icon: 'health' },
      { name: 'Wellness', icon: 'wellness' },
    ],
  },
  {
    name: 'lifestyle',
    type: 'expense',
    items: [
      { name: 'Personal Care', icon: 'personal_care' },
      { name: 'Shoppings', icon: 'shoppings' },
      { name: 'Subscriptions', icon: 'subscriptions' },
    ],
  },
  {
    name: 'miscellaneous',
    type: 'expense',
    items: [
      { name: 'Donations', icon: 'donations' },
      { name: 'Gifts', icon: 'gifts' },
      { name: 'Unexpected Expenses', icon: 'unexpected_expenses' },
    ],
  },
  {
    name: 'office',
    type: 'expense',
    items: [
      { name: 'Furniture', icon: 'furniture' },
      { name: 'Hardware', icon: 'hardware' },
      { name: 'Software', icon: 'software' },
    ],
  },
  {
    name: 'transportation',
    type: 'expense',
    items: [
      { name: 'Fuel', icon: 'fuel' },
      { name: 'Public Transport', icon: 'public_transport' },
      { name: 'Ride Sharing', icon: 'ride_sharing' },
      { name: 'Vehicle Maintainance', icon: 'vehicle_maintainance' },
    ],
  },
];
