import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Bar, CartesianChart, Scatter } from 'victory-native';
import { Finances, PieChartData } from '@/types/types';

const CustomScatterChart = ({ data }: { data: PieChartData[] }) => {
  useEffect(() => {
    console.log('custom scatter chart data', data);
  }, [data]);
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <CartesianChart data={data} xKey="label" yKeys={['value']}>
        {({ points, chartBounds }) => (
          <Bar
            points={points.value}
            chartBounds={chartBounds}
            color="red"
            roundedCorners={{ topLeft: 10, topRight: 10 }}
          />
        )}
      </CartesianChart>
    </View>
  );
};

export default CustomScatterChart;

const styles = StyleSheet.create({});
