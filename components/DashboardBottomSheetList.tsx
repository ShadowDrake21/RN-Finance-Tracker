import React, { RefObject } from 'react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { IFinanceGroup } from '@/types/types';
import FinanceItem from './FinanceItem';

const DashboardBottomSheetList = ({
  bottomSheetRef,
  groups,
  handleLoadMore,
}: {
  bottomSheetRef: RefObject<BottomSheet>;
  groups: IFinanceGroup[];
  handleLoadMore: () => void;
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
    />
  );
};

export default DashboardBottomSheetList;
