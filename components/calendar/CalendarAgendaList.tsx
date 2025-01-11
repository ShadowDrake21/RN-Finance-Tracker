import { StyleSheet, Text } from 'react-native';
import React, { useCallback } from 'react';

import { formatCurrency } from 'react-native-format-currency';
import { COLORS } from '@/constants/colors';
import { AgendaList } from 'react-native-calendars';
import AgendaItem from './AgendaItem';
import { Finances } from '@/types/types';

type CalendarAgendaListProps = {
  items: Finances[];
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
                amount: +total.toFixed(2),
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
