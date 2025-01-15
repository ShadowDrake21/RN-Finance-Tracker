import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { Finances } from '@/types/types';
import { getIconPathParts } from '@/utils/helpers.utils';
import FinanceItemTextContent from './FinanceItemTextContent';

const FinanceItemText = ({ finance }: { finance: Finances }) => {
  const iconParts = getIconPathParts(finance.icon_type);

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
      <FinanceItemTextContent finance={finance} />
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
