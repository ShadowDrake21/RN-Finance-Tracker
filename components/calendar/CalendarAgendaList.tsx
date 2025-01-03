import { StyleSheet, Text } from 'react-native';
import React, { useCallback } from 'react';

import { financeTable } from '@/db/schema';
import { formatCurrency } from 'react-native-format-currency';
import { COLORS } from '@/constants/colors';
import { AgendaList } from 'react-native-calendars';
import AgendaItem from './AgendaItem';

type CalendarAgendaListProps = {
  items: (typeof financeTable.$inferSelect)[];
  total: number;
};

const CalendarAgendaList = ({ items, total }: CalendarAgendaListProps) => {
  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem {...item} />;
  }, []);

  return (
    <AgendaList
      sections={[{ title: items[0]?.date, data: items }]}
      renderItem={renderItem}
      scrollToNextEvent
      ListFooterComponent={
        <Text style={styles.total}>
          Total:{' '}
          <Text
            style={[
              total > 0 ? { color: COLORS.tabBarTintActive } : { color: 'red' },
            ]}
          >
            {
              formatCurrency({
                amount: total,
                code: 'PLN',
              })[0]
            }
          </Text>
        </Text>
      }
    />
  );
};

export default CalendarAgendaList;

const styles = StyleSheet.create({
  total: {
    alignSelf: 'flex-end',
    fontSize: 16,
    paddingHorizontal: 20,
    fontWeight: '700',
  },
});
