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

const FinanceSliderList = ({ category }: { category: FinanceCategory }) => {
  const financeSliderItem = ({ item }: { item: FinanceCategoryItem }) => (
    <TouchableOpacity>
      <Image
        source={
          category.type === 'expense'
            ? EXPENSES_ICONS[category.name.split(' ').join('_')][item.icon]
            : INCOME_ICONS[category.name.split(' ').join('_')][item.icon]
        }
        style={{ width: 50, height: 50, marginBottom: 10 }}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text>{category.name}</Text>
      <FlatList
        data={category.items}
        // estimatedItemSize={30}
        // contentContainerStyle={{ flexDirection: 'row', gap: 20, }}
        scrollEnabled={false}
        numColumns={5}
        renderItem={financeSliderItem}
      />
    </View>
  );
};

export default FinanceSliderList;

const styles = StyleSheet.create({});
