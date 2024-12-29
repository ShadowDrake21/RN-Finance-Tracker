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
  selectedId: string;
  setSelectedId: (month: string) => void;
};

export interface IFinanceGroup {
  date: string;
  total: number;
  items: {
    id: number;
    name: string;
    description?: string;
    price: number;
    iconType: string;
  }[];
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
