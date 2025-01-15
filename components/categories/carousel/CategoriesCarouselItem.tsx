import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FinanceCategory } from '@/types/types';
import { COLORS } from '@/constants/colors';
import CategoriesCarouselItemLink from './CategoriesCarouselItemLink';

const CategoriesCarouselItem = ({
  category: { items, name, type },
}: {
  category: FinanceCategory;
}) => {
  const usableCategory = name.toLowerCase().split(' ').join('_');

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <FlatList
        data={items}
        style={styles.list}
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

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 20 },
  name: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingBottom: 10,
    color: COLORS.extraDarkPrimary,
  },
  list: { flex: 1, gap: 10 },
});
