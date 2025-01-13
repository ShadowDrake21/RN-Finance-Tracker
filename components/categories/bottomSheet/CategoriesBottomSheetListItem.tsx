import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { PieChartData } from '@/types/types';

const CategoriesBottomSheetListItem = ({
  data,
  label,
}: {
  data: PieChartData[];
  label: string;
}) => {
  return (
    <View style={styles.chartItemContainer}>
      <Text style={styles.chartItemTitle}>{label}</Text>
    </View>
  );
};

export default CategoriesBottomSheetListItem;

const styles = StyleSheet.create({
  chartItemContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  chartItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  chartItem: { width: 180, height: 180 },
});
