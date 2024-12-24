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

export type SwitchItemType = {
  label: string;
  value: string;
};
