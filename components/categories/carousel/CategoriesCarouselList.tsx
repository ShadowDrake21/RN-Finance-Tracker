import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { expensesItems } from '@/static/expenses.static';
import { incomeItems } from '@/static/income.static';
import { FinanceCategory } from '@/types/types';
import { FlashList } from '@shopify/flash-list';
import CategoriesCarouselItem from './CategoriesCarouselItem';
import { COLORS } from '@/constants/colors';

const CategoriesCarouselList = ({ items }: { items: FinanceCategory[] }) => {
  const [type, setType] = useState<'expense' | 'income'>('expense');

  useEffect(() => {
    setType(items[0].type);
  }, [items]);

  return (
    <View>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <CategoriesCarouselItem category={item} />}
        ListHeaderComponent={
          <Text
            style={{
              paddingBottom: 15,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '800',
              color: COLORS.extraDarkPrimary,
              textTransform: 'uppercase',
            }}
          >
            {type}
          </Text>
        }
        ListEmptyComponent={<Text>Empty</Text>}
      />
      <Text></Text>
    </View>
  );
};

export default CategoriesCarouselList;

const styles = StyleSheet.create({});
