import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { FinanceCategory, FinanceCategoryItem } from '@/types/types';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { COLORS } from '@/constants/colors';
import { useFinanceForm } from '@/contexts/FinanceFormContext';

const FinanceSliderList = ({ category }: { category: FinanceCategory }) => {
  const {
    financeForm: { kind },
    setField,
  } = useFinanceForm();

  const financeSliderItem = ({ item }: { item: FinanceCategoryItem }) => (
    <TouchableOpacity
      style={[{ alignItems: 'center' }]}
      onPress={() => setField('kind', item.name)}
    >
      <Image
        source={
          category.type === 'expense'
            ? EXPENSES_ICONS[category.name.split(' ').join('_')][item.icon]
            : INCOME_ICONS[category.name.split(' ').join('_')][item.icon]
        }
        style={[styles.btnImage, item.name === kind && styles.btnImageSelected]}
      />
      <Text
        style={[
          { fontSize: 12, textAlign: 'center' },
          item.name === kind
            ? { color: COLORS.selected, fontWeight: 600 }
            : { color: COLORS.text },
        ]}
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
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
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
