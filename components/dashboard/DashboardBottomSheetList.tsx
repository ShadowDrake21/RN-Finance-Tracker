import React, { RefObject } from 'react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { IFinanceGroup } from '@/types/types';
import FinanceItem from '../shared/FinanceItem';
import { Text } from 'react-native';

const DashboardBottomSheetList = ({
  bottomSheetRef,
  groups,
  handleLoadMore,
  listLoading,
  refreshFinances,
}: {
  bottomSheetRef: RefObject<BottomSheet>;
  groups: IFinanceGroup[];
  handleLoadMore: () => void;
  listLoading: boolean;
  refreshFinances: () => Promise<void>;
}) => {
  return (
    <FlashList
      estimatedItemSize={100}
      data={groups}
      contentContainerStyle={{
        paddingBottom: 75,
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.date}
      onEndReached={() => {
        handleLoadMore();
        bottomSheetRef.current?.expand();
      }}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <FinanceItem {...item} />}
      ListEmptyComponent={
        !listLoading ? (
          <Text style={{ fontWeight: '700', alignSelf: 'center' }}>
            No records of income/expenses on this day!
          </Text>
        ) : null
      }
      refreshing={listLoading}
      onRefresh={refreshFinances}
    />
  );
};

export default DashboardBottomSheetList;
