import React, { useEffect, useState } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useFetchMonthChartsData from '@/hooks/useFetchMonthChartsData';

import { IFinanceGroup } from '@/types/types';
import { useAuth } from '@clerk/clerk-expo';
import { getFinancesByType } from '@/supabase/supabase.requests';
import {
  groupFinancesByDate,
  transformFinancesFromDB,
} from '@/utils/finance-groups.utils';
import GeneralBottomSheetList from '@/components/shared/GeneralBottomSheetList';
import Loader from '@/components/shared/Loader';
import { FlashList } from '@shopify/flash-list';
import FinanceItem from '@/components/shared/FinanceItem';
import EmptyLabel from '@/components/ui/EmptyLabel';

const CategoriesBottomSheetList = ({ category }: { category: string }) => {
  const { bottom } = useSafeAreaInsets();

  const { userId, getToken } = useAuth();

  const [groups, setGroups] = useState<IFinanceGroup[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = await getToken({ template: 'supabase' });

      if (!token || !userId) return;

      const finances = await getFinancesByType({
        userId,
        token,
        type: category,
      });

      const transformedFinances = transformFinancesFromDB(finances);

      setGroups((existingGroups) => [
        ...groupFinancesByDate(transformedFinances, existingGroups),
      ]);
    };

    fetchItems();
  }, [category]);
  return (
    <GeneralBottomSheetList>
      <FlashList
        estimatedItemSize={100}
        data={groups}
        contentContainerStyle={{
          paddingBottom: 75,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.date}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <FinanceItem {...item} />}
        ListEmptyComponent={<EmptyLabel />}
        // refreshing={listLoading}
        // onScroll={() => {
        //   bottomSheetRef.current?.expand();
        // }}
        // onEndReached={() => {
        //   handleLoadMore();
        // }}
        // onRefresh={refreshFinances}
      />
    </GeneralBottomSheetList>
  );
};

export default CategoriesBottomSheetList;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginBottom: 16,
    gap: 20,
  },
});
