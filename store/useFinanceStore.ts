import { Finances, IFinanceGroup } from '@/types/types';
import { groupFinancesByDate } from '@/utils/finance-groups.utils';
import { create } from 'zustand';

interface FinanceStore {
  finances: Finances[];
  groups: IFinanceGroup[];
  loading: boolean;
  error: string | null;
  setLoading: (value: boolean) => void;
  setFinances: (finances: Finances[]) => void;
  addFinance: (finance: Finances) => void;
  updateFinance: (updated: Finances) => void;
  deleteFinance: (id: number) => void;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  finances: [],
  groups: [],
  loading: false,
  error: null,
  setLoading: (value: boolean) => set({ loading: value }),
  setFinances: (finances: Finances[]) =>
    set((state) => {
      return {
        finances,
        groups: [...groupFinancesByDate(finances, state.groups)],
      };
    }),
  addFinance: (finance: Finances) => {
    set((state) => {
      return {
        finances: [...state.finances, finance],
        groups: [...groupFinancesByDate([...state.finances, finance], [])],
      };
    });
  },
  updateFinance: (updated: Finances) =>
    set((state) => {
      const updatedFinances = state.finances.map((finance) =>
        updated.id === finance.id ? updated : finance
      );

      return {
        finances: updatedFinances,
        groups: [...groupFinancesByDate(updatedFinances, [])],
      };
    }),
  deleteFinance: (id: number) => {
    set((state) => {
      const updatedFinances = state.finances.filter(
        (finance) => finance.id !== id
      );

      return {
        finances: updatedFinances,
        groups: [...groupFinancesByDate(updatedFinances, [])],
      };
    });
  },
}));
