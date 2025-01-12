import React, { memo, RefObject, useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { IFinanceGroup, PieChartData } from '@/types/types';
import FinanceItem from '../shared/FinanceItem';
import EmptyLabel from '../ui/EmptyLabel';
import GeneralBottomSheetList from '../shared/GeneralBottomSheetList';
import CustomPolarChart from '../shared/CustomPolarChart';
import { formPieChartData } from '@/utils/charts.utils';
import {
  getFinanceSumByMonth,
  getFinanceSumByYear,
} from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';

const ChartsBottomSheetList = ({
  bottomSheetRef,
  year,
  monthsIds,
}: // handleLoadMore,
// refreshFinances,
{
  bottomSheetRef: RefObject<BottomSheet>;
  year: number;
  monthsIds: string[];
  // handleLoadMore: () => void;
  // refreshFinances: () => Promise<void>;
}) => {
  const { userId, getToken } = useAuth();
  const [monthsData, setMonthsData] = useState<Record<
    string,
    (PieChartData & { type: 'income' | 'expense' })[]
  > | null>(null);
  const [yearData, setYearData] = useState<PieChartData[]>([]);

  useEffect(() => {
    fetchMonthsData();
  }, [monthsIds, year]);

  useEffect(() => {
    console.log('monthsData', monthsData);
  }, [monthsData]);

  const fetchMonthsData = async () => {
    const token = await getToken({ template: 'supabase' });

    if (!token || !userId) return;

    const monthsDataPromises = monthsIds.map(async (monthId) => {
      const monthData = [];
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

        monthData.push(...monthInfo);
      }
      return { monthId, data: monthData };
    });

    // Resolve all promises and update state
    const resolvedMonthsData = await Promise.all(monthsDataPromises);

    setMonthsData((prev) => {
      const newMonthsData = resolvedMonthsData.reduce((acc, monthData) => {
        if (monthData) {
          const { monthId, data } = monthData;
          acc[monthId] = data;
        }
        return acc;
      }, {} as Record<string, (PieChartData & { type: 'income' | 'expense' })[]>);

      return { ...prev, ...newMonthsData };
    });
  };

  return (
    <GeneralBottomSheetList>
      {/* <FlashList
        estimatedItemSize={100}
        data={groups}
        contentContainerStyle={{
          paddingBottom: 75,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.date}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <FinanceItem {...item} />}
        ListEmptyComponent={!listLoading ? <EmptyLabel /> : null}
        refreshing={listLoading}
        onScroll={() => {
          console.log('scrolling', bottomSheetRef.current);

          bottomSheetRef.current?.expand();
        }}
        // onEndReached={() => {
        //   handleLoadMore();
        // }}
        // onRefresh={refreshFinances}
      /> */}
      {monthsData &&
        Object.entries(monthsData).map(([monthId, data]) => (
          <View key={monthId} style={{ flex: 1 }}>
            <Text numberOfLines={1}>{monthId}</Text>
            <CustomPolarChart data={data} />
          </View>
        ))}
    </GeneralBottomSheetList>
  );
};

export default ChartsBottomSheetList;
