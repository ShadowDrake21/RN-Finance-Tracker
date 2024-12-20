import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';

const MonthScrollList = ({
  data,
  selectedMonth,
  setSelectedMonth,
}: {
  data: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}) => {
  const flatListRef = React.useRef<FlatList<string>>(null);

  useEffect(() => {
    const index = data.findIndex(
      (month) => month.toLowerCase() === selectedMonth.toLowerCase()
    );
    if (index !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }, 1000); // Adjust the delay as needed
    }
  }, [selectedMonth, data]);

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
      keyExtractor={(item) => item}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            item.toLowerCase() === selectedMonth.toLowerCase()
              ? { backgroundColor: '#2c8f8b' }
              : {},
            {
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
            },
          ]}
          onPress={() => setSelectedMonth(item)}
        >
          <Text
            style={[
              item.toLowerCase() === selectedMonth.toLowerCase() && {
                color: '#fff',
              },
              { fontWeight: '600' },
            ]}
          >
            {item.toUpperCase()}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default MonthScrollList;

const styles = StyleSheet.create({});
