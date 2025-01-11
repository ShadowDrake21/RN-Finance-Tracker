import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { COLORS } from '@/constants/colors';
import { IFinanceGroup } from '@/types/types';
import { format, parse } from 'date-fns';
import { formatCurrency } from 'react-native-format-currency';
import ContextFinanceItemAction from './financeItem/ContextFinanceItemAction';

const FinanceItem = memo((group: IFinanceGroup) => {
  const formattedTotal = formatCurrency({
    amount: +group.total.toFixed(2),
    code: 'PLN',
  });

  const formattedDate = format(
    parse(group.date, 'd-M-yyyy', new Date()),
    'd MMM yyyy'
  );

  return (
    <View style={{ paddingBottom: 10 }}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemInfo}>{formattedDate}</Text>
        <Text style={styles.itemInfo}>{formattedTotal[1]}</Text>
      </View>
      <View>
        {group.items.map((item, index) => (
          <ContextFinanceItemAction key={index} {...item} />
        ))}
      </View>
    </View>
  );
});

export default FinanceItem;

const styles = StyleSheet.create({
  itemInfo: { color: COLORS.darkGray, fontWeight: '500' },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});
