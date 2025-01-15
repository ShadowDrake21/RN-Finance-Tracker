import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { Link } from 'expo-router';
import { formatCurrency } from 'react-native-format-currency';
import { Finances } from '@/types/types';

const FinanceItemActionLink = ({
  item,
  category,
  name,
}: {
  item: Finances;
  category: string;
  name: string;
}) => {
  return (
    <Link href={`/finance-info/${item.id}`} asChild>
      <Pressable key={item.id} style={styles.activityItemInnerContainer}>
        <View style={styles.activityItemBody}>
          <Image
            source={
              item.type === 'expense'
                ? EXPENSES_ICONS[category][name]
                : INCOME_ICONS[category][name]
            }
            style={styles.icon}
          />
          <View style={{ maxWidth: '70%' }}>
            <Text
              style={styles.nameText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>

            <Text style={styles.typeText}>
              {item.icon_type.replace(/_/g, ' ').replace(/\//g, ' / ')}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.price,
              item.price > 0
                ? { color: COLORS.tabBarTintActive }
                : { color: 'red' },
            ]}
          >
            {item.price > 0 && '+'}{' '}
            {
              formatCurrency({
                amount: item.price,
                code: 'PLN',
              })[0]
            }
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default FinanceItemActionLink;

const styles = StyleSheet.create({
  activityItemInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  activityItemBody: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  icon: { width: 50, height: 50 },
  nameText: { fontWeight: '500', fontSize: 18 },
  typeText: {
    fontSize: 12,
    color: COLORS.darkGray,
    textTransform: 'capitalize',
    width: '100%',
  },
  priceContainer: {
    maxWidth: '30%',
    flexShrink: 1,
  },
  price: {
    fontWeight: '500',
    flexWrap: 'wrap',
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
});
