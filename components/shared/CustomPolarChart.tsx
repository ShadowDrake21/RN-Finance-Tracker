import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { Pie, PolarChart } from 'victory-native';
import { PieChartCustomLabel } from './charts/PieChartCustomLabel';
import { PieChartData } from '@/types/types';
import { SkFont } from '@shopify/react-native-skia';

const CustomPolarChart = ({
  data,
  style = { width: 250, height: 250, flex: 1 },
}: {
  data: PieChartData[];
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <PolarChart
      data={data}
      colorKey={'color'}
      valueKey={'value'}
      labelKey={'label'}
      canvasStyle={style}
    >
      <Pie.Chart>
        {({ slice }) => {
          return (
            <>
              <Pie.Slice>
                <Pie.Label>
                  {(position) => (
                    <PieChartCustomLabel
                      position={position}
                      slice={slice}
                      currency={data[0].currency}
                    />
                  )}
                </Pie.Label>
              </Pie.Slice>
            </>
          );
        }}
      </Pie.Chart>
    </PolarChart>
  );
};

export default CustomPolarChart;

const styles = StyleSheet.create({});
