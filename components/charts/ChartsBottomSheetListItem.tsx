import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomPolarChart from '../shared/CustomPolarChart';
import { PieChartData } from '@/types/types';

const ChartsBottomSheetListItem = ({
  data,
  label,
}: {
  data: PieChartData[];
  label: string;
}) => {
  return (
    <View style={styles.chartItemContainer}>
      <Text style={styles.chartItemTitle}>{label}</Text>
      {data[0].value === 0 && data[1].value === 0 ? (
        <Text>No data</Text>
      ) : (
        <CustomPolarChart
          data={data}
          style={styles.chartItem}
          isValueVisible={false}
          noValueLabel=""
        />
      )}
    </View>
  );
};

export default ChartsBottomSheetListItem;

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
