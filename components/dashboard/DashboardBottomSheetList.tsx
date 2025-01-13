import React, { memo, RefObject, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { IFinanceGroup } from '@/types/types';
import FinanceItem from '../shared/FinanceItem';
import EmptyLabel from '../ui/EmptyLabel';
import GeneralBottomSheetList from '../shared/GeneralBottomSheetList';

const DashboardBottomSheetList = ({
  bottomSheetRef,
  groups,
  listLoading,
}: // handleLoadMore,
// refreshFinances,
{
  bottomSheetRef: RefObject<BottomSheet>;
  groups: IFinanceGroup[];
  listLoading: boolean;
  // handleLoadMore: () => void;
  // refreshFinances: () => Promise<void>;
}) => {
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
        ListEmptyComponent={!listLoading ? <EmptyLabel /> : null}
        refreshing={listLoading}
        onScroll={() => {
          bottomSheetRef.current?.expand();
        }}
        // onEndReached={() => {
        //   handleLoadMore();
        // }}
        // onRefresh={refreshFinances}
      />
    </GeneralBottomSheetList>
  );
};

export default memo(DashboardBottomSheetList);
