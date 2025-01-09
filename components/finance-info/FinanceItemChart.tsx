import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomPolarChart from '../shared/CustomPolarChart';
import { PieChartData } from '@/types/types';

const FinanceItemChart = ({
  text,
  data,
}: {
  text: string;
  data: PieChartData[];
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.chartText}>{text}</Text>
      <CustomPolarChart data={data} />
    </View>
  );
};

export default FinanceItemChart;

const styles = StyleSheet.create({
  containerWrapper: { paddingVertical: 25, gap: 20 },
  chartText: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
    paddingBottom: 10,
  },
});
