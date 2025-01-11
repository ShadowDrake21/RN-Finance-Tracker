import { FlatList } from 'react-native';
import React, { memo, useEffect } from 'react';
import { MonthScrollItem, MonthScrollListProps } from '@/types/types';
import { useFinanceStore } from '@/store/useFinanceStore';
import MonthScrollListItem from './MonthScrollListItem';

const MonthScrollList = ({ data }: MonthScrollListProps) => {
  const flatListRef = React.useRef<FlatList<MonthScrollItem>>(null);
  const { monthId } = useFinanceStore();

  useEffect(() => {
    const index = data.findIndex(
      (month) => month.id.toLowerCase() === monthId.toLowerCase()
    );
    if (index !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }, 1000);
    }
  }, [monthId, data]);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      scrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScrollToIndexFailed={(info) => {
        console.warn('Scroll to index failed', info);
      }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      renderItem={({ item }) => <MonthScrollListItem {...item} />}
    />
  );
};

export default memo(MonthScrollList);
