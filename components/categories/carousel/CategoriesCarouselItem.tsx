import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { FinanceCategory } from '@/types/types';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { Link } from 'expo-router';
import { COLORS } from '@/constants/colors';
import CategoriesCarouselItemLink from './CategoriesCarouselItemLink';

const CategoriesCarouselItem = ({
  category: { items, name, type },
}: {
  category: FinanceCategory;
}) => {
  const usableCategory = name.toLowerCase().split(' ').join('_');

  console.log('category', items, name);

  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          textTransform: 'uppercase',
          textAlign: 'center',
          paddingBottom: 10,
          color: COLORS.extraDarkPrimary,
        }}
      >
        {name}
      </Text>
      <FlatList
        data={items}
        style={{ flex: 1, gap: 10 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <CategoriesCarouselItemLink
            categoryName={usableCategory}
            type={type}
            item={item}
          />
        )}
        ListEmptyComponent={<Text>Empty</Text>}
      />
    </View>
  );
};

export default CategoriesCarouselItem;

const styles = StyleSheet.create({});
