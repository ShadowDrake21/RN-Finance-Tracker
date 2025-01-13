import React from 'react';
import GeneralBottomSheetList from '../shared/GeneralBottomSheetList';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChartsBottomSheetListItem from './ChartsBottomSheetListItem';
import ChartsBottomSheetListTitle from './ChartsBottomSheetListTitle';
import useFetchMonthChartsData from '@/hooks/useFetchMonthChartsData';
import Loader from '../shared/Loader';

const ChartsBottomSheetList = ({
  year,
  monthsIds,
}: {
  year: number;
  monthsIds: string[];
}) => {
  const { bottom } = useSafeAreaInsets();
  const { data, loading } = useFetchMonthChartsData({ monthsIds, year });

  return (
    <GeneralBottomSheetList>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: bottom + 20 }}>
          {loading ? (
            <Loader />
          ) : (
            data.map(({ monthId, data }) => (
              <View key={monthId} style={styles.chartContainer}>
                <ChartsBottomSheetListTitle monthId={monthId} year={year} />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <ChartsBottomSheetListItem
                    data={data.income}
                    label="Income"
                  />

                  <ChartsBottomSheetListItem
                    data={data.expense}
                    label="Expense"
                  />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </GeneralBottomSheetList>
  );
};

export default ChartsBottomSheetList;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginBottom: 16,
    gap: 20,
  },
});
