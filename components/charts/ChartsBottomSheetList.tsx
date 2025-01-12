import React, { RefObject, useEffect, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { PieChartData } from '@/types/types';
import GeneralBottomSheetList from '../shared/GeneralBottomSheetList';
import { formPieChartData } from '@/utils/charts.utils';
import {
  getFinanceSumByMonth,
  getFinanceSumByYear,
} from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChartsBottomSheetListItem from './ChartsBottomSheetListItem';
import ChartsBottomSheetListTitle from './ChartsBottomSheetListTitle';

const ChartsBottomSheetList = ({
  year,
  monthsIds,
}: {
  bottomSheetRef: RefObject<BottomSheet>;
  year: number;
  monthsIds: string[];
}) => {
  const { bottom } = useSafeAreaInsets();
  const { userId, getToken } = useAuth();
  const [monthsData, setMonthsData] = useState<Record<
    string,
    { income: PieChartData[]; expense: PieChartData[] }
  > | null>(null);

  useEffect(() => {
    fetchMonthsData();

    return () => {
      setMonthsData(null);
    };
  }, [monthsIds, year]);

  const fetchMonthsData = async () => {
    const token = await getToken({ template: 'supabase' });

    if (!token || !userId) return;

    const monthsDataPromises = monthsIds.map(async (monthId) => {
      const monthData: { income: PieChartData[]; expense: PieChartData[] } = {
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
          },
        }).map((data) => ({ ...data, type }));

        monthData[type].push(...monthInfo);
      }
      return { monthId, data: monthData };
    });

    const resolvedMonthsData = await Promise.all(monthsDataPromises);

    setMonthsData((prev) => {
      const newMonthsData = resolvedMonthsData.reduce((acc, monthData) => {
        if (monthData) {
          const { monthId, data } = monthData;
          acc[monthId] = data;
        }
        return acc;
      }, {} as Record<string, { income: PieChartData[]; expense: PieChartData[] }>);

      return { ...prev, ...newMonthsData };
    });
  };

  return (
    <GeneralBottomSheetList>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: bottom + 20 }}>
          {monthsData &&
            Object.entries(monthsData).map(([monthId, data]) => (
              <View key={monthId} style={styles.chartContainer}>
                <ChartsBottomSheetListTitle monthId={monthId} year={year} />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <ChartsBottomSheetListItem
                    data={data.income}
                    label="Income"
                  />

                  <ChartsBottomSheetListItem
                    data={data.expense}
                    label="Expense"
                  />
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </GeneralBottomSheetList>
  );
};

export default ChartsBottomSheetList;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginBottom: 16,
    gap: 20,
  },
});
