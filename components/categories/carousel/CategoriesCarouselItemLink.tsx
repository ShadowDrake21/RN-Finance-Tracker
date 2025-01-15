import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { FinanceCategoryItem } from '@/types/types';

const CategoriesCarouselItemLink = ({
  item,
  categoryName,
  type,
}: {
  item: FinanceCategoryItem;
  categoryName: string;
  type: 'income' | 'expense';
}) => {
  const link = `/(tabs)/categories/${categoryName}-${item.name.toLowerCase()}`;
  return (
    <Link href={link} asChild>
      <TouchableOpacity style={styles.container}>
        <Image
          source={
            type === 'expense'
              ? EXPENSES_ICONS[categoryName][item.icon]
              : INCOME_ICONS[categoryName][item.icon]
          }
          style={styles.icon}
        />
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CategoriesCarouselItemLink;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    padding: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: { width: 100, height: 100 },
  text: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.extraDarkPrimary,
  },
});
