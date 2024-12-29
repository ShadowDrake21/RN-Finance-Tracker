import { FinanceCategory } from '@/types/types';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';

export const expensesItems: FinanceCategory[] = [
  {
    name: 'Essentials',
    items: [
      { name: 'Groceries', icon: EXPENSES_ICONS.essentials.groceries },
      { name: 'Housing', icon: EXPENSES_ICONS.essentials.housing },
      { name: 'Insurance', icon: EXPENSES_ICONS.essentials.insurance },
      { name: 'Rent', icon: EXPENSES_ICONS.essentials.rent },
      { name: 'Utilities', icon: EXPENSES_ICONS.essentials.utilities },
    ],
  },
  {
    name: 'Education',
    items: [
      { name: 'Books', icon: EXPENSES_ICONS.education.books },
      { name: 'Education', icon: EXPENSES_ICONS.education.education },
      {
        name: 'Online Learning',
        icon: EXPENSES_ICONS.education.online_learning,
      },
    ],
  },
  {
    name: 'Entertainment',
    items: [
      { name: 'Events', icon: EXPENSES_ICONS.entertainment.events },
      { name: 'Gaming', icon: EXPENSES_ICONS.entertainment.gaming },
      { name: 'Hobbies', icon: EXPENSES_ICONS.entertainment.hobbies },
      { name: 'Hotel', icon: EXPENSES_ICONS.entertainment.hotel },
      {
        name: 'Streaming Services',
        icon: EXPENSES_ICONS.entertainment.streaming_services,
      },
    ],
  },
  {
    name: 'Family and Relationships',
    items: [
      {
        name: 'Childcare',
        icon: EXPENSES_ICONS['family-and-relationships'].childcare,
      },
      {
        name: 'Family Care',
        icon: EXPENSES_ICONS['family-and-relationships'].family_care,
      },
      { name: 'Pets', icon: EXPENSES_ICONS['family-and-relationships'].pets },
      {
        name: 'Relationship',
        icon: EXPENSES_ICONS['family-and-relationships'].relationship,
      },
    ],
  },
  {
    name: 'Financial Obligations',
    items: [
      {
        name: 'Investments',
        icon: EXPENSES_ICONS['financial-obligations'].investments,
      },
      { name: 'Loan', icon: EXPENSES_ICONS['financial-obligations'].loan },
      { name: 'Tax', icon: EXPENSES_ICONS['financial-obligations'].tax },
    ],
  },
  {
    name: 'Food and Dining',
    items: [
      { name: 'Alcohol', icon: EXPENSES_ICONS['food-and-dining'].alcohol },
      { name: 'Candies', icon: EXPENSES_ICONS['food-and-dining'].candies },
      { name: 'Coffee', icon: EXPENSES_ICONS['food-and-dining'].coffee },
      {
        name: 'Restaurant',
        icon: EXPENSES_ICONS['food-and-dining'].restaurant,
      },
    ],
  },
  {
    name: 'Health and Wellness',
    items: [
      { name: 'Fitness', icon: EXPENSES_ICONS['health-and-wellness'].fitness },
      { name: 'Health', icon: EXPENSES_ICONS['health-and-wellness'].health },
      {
        name: 'Wellness',
        icon: EXPENSES_ICONS['health-and-wellness'].wellness,
      },
    ],
  },
  {
    name: 'Lifestyle',
    items: [
      { name: 'Personal Care', icon: EXPENSES_ICONS.lifestyle.personal_care },
      { name: 'Shoppings', icon: EXPENSES_ICONS.lifestyle.shoppings },
      { name: 'Subscriptions', icon: EXPENSES_ICONS.lifestyle.subscriptions },
    ],
  },
  {
    name: 'Miscellaneous',
    items: [
      { name: 'Donations', icon: EXPENSES_ICONS.miscellaneous.donations },
      { name: 'Gifts', icon: EXPENSES_ICONS.miscellaneous.gifts },
      {
        name: 'Unexpected Expenses',
        icon: EXPENSES_ICONS.miscellaneous.unexpected_expenses,
      },
    ],
  },
  {
    name: 'Office',
    items: [
      { name: 'Furniture', icon: EXPENSES_ICONS.office.furniture },
      { name: 'Hardware', icon: EXPENSES_ICONS.office.hardware },
      { name: 'Software', icon: EXPENSES_ICONS.office.software },
    ],
  },
  {
    name: 'Transportation',
    items: [
      { name: 'Fuel', icon: EXPENSES_ICONS.transportation.fuel },
      {
        name: 'Public Transport',
        icon: EXPENSES_ICONS.transportation.public_transport,
      },
      {
        name: 'Ride Sharing',
        icon: EXPENSES_ICONS.transportation.ride_sharing,
      },
      {
        name: 'Vehicle Maintainance',
        icon: EXPENSES_ICONS.transportation.vehicle_maintainance,
      },
    ],
  },
];
