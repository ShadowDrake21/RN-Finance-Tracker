import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';
import { formatCurrency } from 'react-native-format-currency';

const CalendarAgendaListFooter = ({ total }: { total: number }) => {
  return (
    <Text style={styles.total}>
      Total:{' '}
      <Text
        style={[
          total > 0 ? { color: COLORS.tabBarTintActive } : { color: 'red' },
        ]}
      >
        {
          formatCurrency({
            amount: +total.toFixed(2),
            code: 'PLN',
          })[0]
        }
      </Text>
    </Text>
  );
};

export default CalendarAgendaListFooter;

const styles = StyleSheet.create({
  total: {
    alignSelf: 'flex-end',
    fontSize: 16,
    paddingHorizontal: 20,
    fontWeight: '700',
  },
});
