import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import {
  ChartsBottomRawMonthData,
  ChartsBottomReadyMonthData,
} from '@/types/types';
import {
  getFinanceSumByMonth,
  getFinanceSumByYear,
} from '@/supabase/supabase.requests';
import { formPieChartData } from '@/utils/charts.utils';

const useFetchMonthChartsData = ({
  monthsIds,
  year,
}: {
  monthsIds: string[];
  year: number;
}) => {
  const { userId, getToken } = useAuth();
  const [data, setData] = useState<ChartsBottomReadyMonthData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setData([]);
    };
  }, []);

  const fetchMonthsData = useCallback(async () => {
    setLoading(true);
    const token = await getToken({ template: 'supabase' });

    if (!token || !userId) {
      setLoading(false);
      return;
    }

    for (const monthId of [...monthsIds]) {
      const monthData: ChartsBottomRawMonthData = {
        income: [],
        expense: [],
      };

      for (const type of ['income', 'expense'] as const) {
        const yearPrice = await getFinanceSumByYear({
          type,
          year,
          token,
          userId,
        });

        const monthPrice = await getFinanceSumByMonth({
          type,
          selectedMonthId: monthId,
          token,
          userId,
        });

        const monthInfo = formPieChartData({
          fullPrice: yearPrice,
          finance: {
            name: `${type.slice(0, 1).toUpperCase()}${type.slice(
              1
            )} for ${monthId}`,
            price: monthPrice,
            currency: 'pln',
            type,
          },
        });

        monthData[type].push(...monthInfo);
      }

      setData((prevData) => [...prevData, { monthId, data: monthData }]);
      setLoading(false);
    }
  }, [monthsIds, year]);

  useEffect(() => {
    fetchMonthsData();
  }, [fetchMonthsData]);

  return { data, loading };
};

export default useFetchMonthChartsData;
