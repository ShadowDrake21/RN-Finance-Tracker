import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';

const MonthScrollListItem = ({ id, text }: { id: string; text: string }) => {
  const { monthId, setMonthId } = useFinanceStore();
  return (
    <Pressable
      style={[
        id.toLowerCase() === monthId.toLowerCase() && {
          backgroundColor: '#2c8f8b',
        },
        styles.container,
      ]}
      onPress={() => setMonthId(id)}
    >
      <Text
        style={[
          id.toLowerCase() === monthId.toLowerCase() && {
            color: '#fff',
          },
          { fontWeight: '600' },
        ]}
      >
        {text.toUpperCase()}
      </Text>
    </Pressable>
  );
};

export default MonthScrollListItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
