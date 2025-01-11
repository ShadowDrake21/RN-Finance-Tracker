import React, { memo, RefObject } from 'react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { IFinanceGroup } from '@/types/types';
import FinanceItem from '../shared/FinanceItem';

import DashboarBottomSheetListEmpty from './DashboardBottomSheetListEmpty';

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
      }}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <FinanceItem {...item} />}
      ListEmptyComponent={
        !listLoading ? <DashboarBottomSheetListEmpty /> : null
      }
      refreshing={listLoading}
      // onRefresh={refreshFinances}
      onScroll={() => bottomSheetRef.current?.expand()}
    />
  );
};

export default memo(DashboardBottomSheetList);
