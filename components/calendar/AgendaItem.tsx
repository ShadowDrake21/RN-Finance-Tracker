import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FinanceItemAction } from '../shared/FinanceItem';
import { Finances, IFinanceItemAction } from '@/types/types';

const AgendaItem = (item: Finances) => {
  if (!item) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <FinanceItemAction {...item} />
    </View>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});
