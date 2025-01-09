import {
  getFinanceSumByDay,
  getFinanceSumByMonth,
} from '@/supabase/supabase.requests';
import { Finances, PieChartData } from '@/types/types';
import { formPieChartData } from '@/utils/charts.utils';
import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';

const usePieChartData = (finance: Finances | undefined) => {
  const { getToken, userId } = useAuth();
  const [dayData, setDayData] = useState<PieChartData[]>([]);
  const [monthData, setMonthData] = useState<PieChartData[]>([]);

  const fetchPieChartData = useCallback(async () => {
    if (!finance || !userId) return;

    const token = await getToken({ template: 'supabase' });

    if (!token) return;

    const dateData = formPieChartData({
      fullPrice: await getFinanceSumByDay({
        type: finance.type,
        selectedDate: finance.date,
        token,
        userId: userId,
      }),
      finance: {
        name: finance.name,
        price: finance.price,
        currency: finance.currency.label,
      },
    });

    const monthData = formPieChartData({
      fullPrice: await getFinanceSumByMonth({
        type: finance.type,
        selectedMonthId: `${new Date(finance.date).getMonth() + 1}-${new Date(
          finance.date
        ).getFullYear()}`,
        token,
        userId: userId,
      }),
      finance: {
        name: finance.name,
        price: finance.price,
        currency: finance.currency.label,
      },
    });

    setDayData(dateData);
    setMonthData(monthData);
  }, [finance, userId]);

  useEffect(() => {
    fetchPieChartData();
  }, [fetchPieChartData]);

  return { dayData, monthData };
};

export default usePieChartData;
