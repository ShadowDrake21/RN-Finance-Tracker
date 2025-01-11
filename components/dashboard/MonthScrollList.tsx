import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { memo, useEffect } from 'react';
import { MonthScrollItem, MonthScrollListProps } from '@/types/types';

const MonthScrollList = ({
  data,
  selectedId,
  setSelectedId,
}: MonthScrollListProps) => {
  const flatListRef = React.useRef<FlatList<MonthScrollItem>>(null);

  useEffect(() => {
    const index = data.findIndex(
      (month) => month.id.toLowerCase() === selectedId.toLowerCase()
    );
    if (index !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }, 1000);
    }
  }, [selectedId, data]);

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
      renderItem={({ item: { id, text } }) => (
        <Pressable
          style={[
            id.toLowerCase() === selectedId.toLowerCase()
              ? { backgroundColor: '#2c8f8b' }
              : {},
            {
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
            },
          ]}
          onPress={() => setSelectedId(id)}
        >
          <Text
            style={[
              id.toLowerCase() === selectedId.toLowerCase() && {
                color: '#fff',
              },
              { fontWeight: '600' },
            ]}
          >
            {text.toUpperCase()}
          </Text>
        </Pressable>
      )}
    />
  );
};

export default memo(MonthScrollList);

const styles = StyleSheet.create({});
