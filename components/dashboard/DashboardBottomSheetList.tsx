import React, { memo, RefObject } from 'react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { IFinanceGroup } from '@/types/types';
import FinanceItem from '../shared/FinanceItem';

import EmptyLabel from '../ui/EmptyLabel';
import { View } from 'react-native';

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
    <View
      style={{
        flex: 1,
      }}
    >
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
        onScroll={() => bottomSheetRef.current?.expand()}
        // onEndReached={() => {
        //   handleLoadMore();
        // }}
        // onRefresh={refreshFinances}
      />
    </View>
  );
};

export default memo(DashboardBottomSheetList);
