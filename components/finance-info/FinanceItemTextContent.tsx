import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Finances } from '@/types/types';
import { format } from 'date-fns';

const FinanceItemTextContent = ({ finance }: { finance: Finances }) => {
  return (
    <View style={styles.topTextContainer}>
      <Text
        style={[
          styles.topTextPrice,
          { color: finance.type === 'expense' ? 'red' : 'green' },
        ]}
      >
        {finance.price} {finance.currency.label}
      </Text>

      <Text ellipsizeMode="middle" style={styles.topTextItem}>
        Name: <Text style={{ fontWeight: '700' }}>{finance.name}</Text>
      </Text>
      <Text style={styles.topTextItem}>
        Type: <Text style={{ fontWeight: '700' }}>{finance.type}</Text>
      </Text>
      <Text style={styles.topTextItem}>
        Subtype:{' '}
        <Text style={{ fontWeight: '700' }}>
          {finance.icon_type.replace(/_/g, ' ').replace(/\//g, ' / ')}
        </Text>
      </Text>
      <Text style={styles.topTextItem}>
        Date:{' '}
        <Text style={{ fontWeight: '700' }}>
          {format(
            new Date(finance.date).toISOString().split('T')[0],
            'E, d MMMM yyyy'
          )}
        </Text>
      </Text>
    </View>
  );
};

export default FinanceItemTextContent;

const styles = StyleSheet.create({
  topTextContainer: { flexShrink: 1, flex: 1 },
  topTextPrice: {
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'flex-end',
    paddingBottom: 20,
  },
  topTextItem: { textTransform: 'capitalize', fontSize: 16 },
});
