import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { Finances } from '@/types/types';
import { getIconPathParts } from '@/utils/helpers.utils';

const FinanceItemText = ({ finance }: { finance: Finances }) => {
  const [iconParts, setIconParts] = useState<string[]>([]);

  useEffect(() => {
    setIconParts(getIconPathParts(finance.icon_type));
  }, [finance]);

  return (
    <View style={styles.topContainer}>
      <Image
        source={
          finance.type === 'expense'
            ? EXPENSES_ICONS[iconParts[0]][iconParts[1]]
            : INCOME_ICONS[iconParts[0]][iconParts[1]]
        }
        style={styles.topImage}
      />
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
    </View>
  );
};

export default FinanceItemText;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 15,
  },
  topImage: {
    width: 100,
    height: 100,
    flexShrink: 0,
    alignSelf: 'flex-end',
  },
  topTextContainer: { flexShrink: 1, flex: 1 },
  topTextPrice: {
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'flex-end',
    paddingBottom: 20,
  },
  topTextItem: { textTransform: 'capitalize', fontSize: 16 },
});
