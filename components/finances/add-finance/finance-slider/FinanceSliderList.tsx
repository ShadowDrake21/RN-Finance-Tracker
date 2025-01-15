import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FinanceCategory } from '@/types/types';
import { COLORS } from '@/constants/colors';
import FinanceSliderItem from './FinanceSliderItem';

const FinanceSliderList = ({ category }: { category: FinanceCategory }) => {
  return (
    <View>
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={category.items}
        numColumns={5}
        renderItem={({ item }) => (
          <FinanceSliderItem
            item={item}
            categoryName={category.name}
            categoryType={category.type}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

export default FinanceSliderList;

const styles = StyleSheet.create({
  categoryName: {
    textTransform: 'capitalize',
    paddingVertical: 10,
    fontWeight: '700',
  },

  btnImage: { width: 50, height: 50, marginBottom: 10 },
  btnImageSelected: {
    borderColor: COLORS.selected,
    borderWidth: 3,
    borderRadius: '50%',
  },
});
