export type MonthScrollItem = {
  id: string;
  text: string;
};

export type MonthScrollListProps = {
  data: MonthScrollItem[];
  selectedId: string;
  setSelectedId: (month: string) => void;
};
