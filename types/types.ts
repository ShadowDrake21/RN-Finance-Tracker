import BottomSheet from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type Currency = {
  label: string;
  value: string;
};

export type OnboardingItem = {
  animationPath: string;
  title: string;
  description: string;
};

export type SignInFormType = {
  email: string;
  password: string;
};

export type SignUpFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type MonthScrollItem = {
  id: string;
  text: string;
};

export type MonthScrollListProps = {
  data: MonthScrollItem[];
};

export interface IFinanceGroup {
  date: string;
  total: number;
  items: Finances[];
}

export interface IFinanceItemAction {
  id: number;
  name: string;
  description?: string;
  price: number;
  iconType: string;
}

export type SwitchItemProps = {
  disabled?: boolean;
  activeText: string;
  inActiveText: string;
  circleSize: number;
  barHeight: number;
  circleBorderWidth: number;
  backgroundActive: string;
  backgroundInactive: string;
  circleActiveColor: string;
  circleInActiveColor: string;
};

export type FinanceCategory = {
  name: string;
  type: 'expense' | 'income';
  items: FinanceCategoryItem[];
};

export type FinanceCategoryItem = {
  name: string;
  icon: string;
};

export type FinanceIconsType = {
  [key: string]: {
    [key: string]: any;
  };
};

export type FinanceFormType = {
  id: number;
  type: 'expense' | 'income';
  kind: string;
  sum: number | null;
  currency: Currency;
  note: string;
  image: string | null;
  date: string;
  action?: 'create' | 'edit';
  prevImage?: string | null;
};

export type Finances = {
  id: number;
  user_id: number;
  date: string;
  name: string;
  price: number;
  image: string | null;
  type: 'expense' | 'income';
  icon_type: string;
  currency: Currency;
};

export type PieChartData = {
  value: number;
  color: string;
  label: string;
  currency: string;
  type?: 'income' | 'expense';
};

export interface ChartsBottomRawMonthData {
  income: PieChartData[];
  expense: PieChartData[];
}

export interface ChartsBottomReadyMonthData {
  monthId: string;
  data: ChartsBottomRawMonthData;
}

export type CalendarAgendaListProps = {
  items: Finances[];
  total: number;
};

export type GeneralBottomSheetProps = {
  bottomSheetRef: RefObject<BottomSheet>;
  snapPoints?: (number | string)[];
  containerStyle?: StyleProp<ViewStyle>;
  pointIndex?: number;
};

export type MoneyDashboardInfoProps = {
  selectedMonth: MonthScrollItem;
  expenseBalance: number;
  incomeBalance: number;
  formatedBalance: string;
};

export type TypeSwitchProps = {
  type: 'expense' | 'income';
  setField: (field: keyof FinanceFormType, value: any) => void;
};
