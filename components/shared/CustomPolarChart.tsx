import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Pie, PolarChart } from 'victory-native';
import { PieChartCustomLabel } from './charts/PieChartCustomLabel';
import { PieChartData } from '@/types/types';
import { SkFont } from '@shopify/react-native-skia';

const CustomPolarChart = ({ data }: { data: PieChartData[] }) => {
  return (
    <PolarChart
      data={data}
      colorKey={'color'}
      valueKey={'value'}
      labelKey={'label'}
      canvasStyle={{ width: 300, height: 300 }}
    >
      <Pie.Chart>
        {({ slice }) => {
          return (
            <>
              <Pie.Slice>
                <Pie.Label>
                  {(position) => (
                    <PieChartCustomLabel position={position} slice={slice} />
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
