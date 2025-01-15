import { StyleSheet, View } from 'react-native';
import React from 'react';
import ChartsBottomSheetListTitle from './ChartsBottomSheetListTitle';
import ChartsBottomSheetListItem from './ChartsBottomSheetListItem';
import { ChartsBottomRawMonthData } from '@/types/types';

const ChartsBottomSheetListContent = ({
  data,
  monthId,
  year,
}: {
  data: ChartsBottomRawMonthData;
  monthId: string;
  year: number;
}) => {
  return (
    <View style={styles.chartContainer}>
      <ChartsBottomSheetListTitle monthId={monthId} year={year} />
      <View style={styles.wrapper}>
        <ChartsBottomSheetListItem data={data.income} label="Income" />
        <ChartsBottomSheetListItem data={data.expense} label="Expense" />
      </View>
    </View>
  );
};

export default ChartsBottomSheetListContent;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginBottom: 16,
    gap: 20,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
});
