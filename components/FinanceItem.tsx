import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo, useEffect } from 'react';
import { COLORS } from '@/constants/colors';
import { IFinanceGroup } from '@/types';
import { format, parse } from 'date-fns';
import { formatCurrency } from 'react-native-format-currency';
import { FINANCE_ICONS } from '@/constants/icons';

const FinanceItem = memo((group: IFinanceGroup) => {
  const formattedTotal = formatCurrency({
    amount: group.total,
    code: 'PLN',
  });
  const formattedDate = format(
    parse(group.date, 'd-M-yyyy', new Date()),
    'd MMM yyyy'
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: COLORS.darkGray, fontWeight: '500' }}>
          {formattedDate}
        </Text>
        <Text style={{ color: COLORS.darkGray, fontWeight: '500' }}>
          {formattedTotal[0]}
        </Text>
      </View>
      <View>
        {group.items.map((item, index) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 15,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}
            >
              <Image
                source={
                  FINANCE_ICONS[item.iconType as keyof typeof FINANCE_ICONS]
                }
                style={{ width: 50, height: 50 }}
              />
              <View style={{ maxWidth: '70%' }}>
                <Text
                  style={{ fontWeight: '500', fontSize: 18 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                {/* notes, photos */}
                {item.description && (
                  <Text style={{ fontSize: 12, color: COLORS.darkGray }}>
                    {item.description}
                  </Text>
                )}
              </View>
            </View>
            <Text
              style={
                item.price > 0
                  ? { color: COLORS.tabBarTintActive }
                  : { color: 'red' }
              }
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
        ))}
      </View>
    </View>
  );
});

export default FinanceItem;

const styles = StyleSheet.create({});
