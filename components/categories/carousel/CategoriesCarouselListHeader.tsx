import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

const CategoriesCarouselListHeader = ({ type }: { type: string }) => {
  return <Text style={styles.text}>{type}</Text>;
};

export default CategoriesCarouselListHeader;

const styles = StyleSheet.create({
  text: {
    paddingBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.extraDarkPrimary,
    textTransform: 'uppercase',
  },
});
