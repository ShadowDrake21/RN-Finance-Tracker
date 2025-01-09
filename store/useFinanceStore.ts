import { getFinancesByMonth } from '@/supabase/supabase.requests';
import { Finances, IFinanceGroup } from '@/types/types';
import {
  groupFinancesByDate,
  transformFinancesFromDB,
  updateGroupedFinances,
} from '@/utils/finance-groups.utils';
import { useAuth } from '@clerk/clerk-expo';
import { create } from 'zustand';

interface FinanceStore {
  finances: Finances[];
  groups: IFinanceGroup[];
  loading: boolean;
  error: string | null;
  setFinances: (finances: Finances[]) => void;
  updateFinances: (updated: Finances[]) => void;
  fetchFinancesByMonth: (
    selectedMonthId: string,
    offset: number,
    limit: number
  ) => Promise<void>;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  finances: [],
  groups: [],
  loading: false,
  error: null,
  setFinances: (finances: Finances[]) =>
    set((state) => {
      return {
        finances,
        groups: [...groupFinancesByDate(finances, state.groups)],
      };
    }),
  updateFinances: (updated: Finances[]) =>
    set((state) => {
      const updatedFinances = state.finances.map(
        (finance) => updated.find((u) => u.id === finance.id) || finance
      );
      const changedElements = updatedFinances.filter(
        (finance, index) => finance !== state.finances[index]
      );
      console.log('Changed elements:', changedElements);
      return {
        finances: updatedFinances,
        groups: [...updateGroupedFinances(state.groups, changedElements)],
      };
    }),
  fetchFinancesByMonth: async (selectedMonthId, offset, limit) => {
    set({ loading: true });
    console.log('fetching finances, selectedMonthId:', selectedMonthId);
    const { userId, getToken } = useAuth();
    const token = await getToken({ template: 'supabase' });
    if (!token || !userId) {
      set({ error: 'No user or token', loading: false });
      return;
    }

    const fetchedfinances = await getFinancesByMonth({
      userId,
      token,
      selectedMonthId,
      offset,
      limit,
    });
    console.log('finances', fetchedfinances);

    const transformedFinances = transformFinancesFromDB(fetchedfinances);

    console.log('transformedFinances', transformedFinances);
    set({ finances: transformedFinances, loading: false });
  },
}));
