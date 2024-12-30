import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { FinanceCategory, FinanceCategoryItem } from '@/types/types';
import { FlashList } from '@shopify/flash-list';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { COLORS } from '@/constants/colors';

const FinanceSliderList = ({ category }: { category: FinanceCategory }) => {
  const financeSliderItem = ({ item }: { item: FinanceCategoryItem }) => (
    <TouchableOpacity style={{ alignItems: 'center' }}>
      <Image
        source={
          category.type === 'expense'
            ? EXPENSES_ICONS[category.name.split(' ').join('_')][item.icon]
            : INCOME_ICONS[category.name.split(' ').join('_')][item.icon]
        }
        style={{ width: 50, height: 50, marginBottom: 10 }}
      />
      <Text
        style={{ fontSize: 12, textAlign: 'center', color: COLORS.text }}
        numberOfLines={item.name.split(' ').length}
      >
        {item.name.split(' ').map((word, index) => (
          <Text key={index}>
            {word}
            {'\n'}
          </Text>
        ))}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text
        style={{
          textTransform: 'capitalize',
          paddingVertical: 10,
          fontWeight: '700',
          // fontSize: 14,
        }}
      >
        {category.name}
      </Text>
      <FlatList
        // style={{ alignSelf: 'center' }}

        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={category.items}
        numColumns={5}
        renderItem={financeSliderItem}
        scrollEnabled={false}
      />
    </View>
  );
};

export default FinanceSliderList;

const styles = StyleSheet.create({});
