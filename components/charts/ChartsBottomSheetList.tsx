import React from 'react';
import GeneralBottomSheetList from '../shared/GeneralBottomSheetList';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFetchMonthChartsData from '@/hooks/useFetchMonthChartsData';
import Loader from '../shared/Loader';
import ChartsBottomSheetListContent from './ChartsBottomSheetListContent';

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
              <ChartsBottomSheetListContent
                key={monthId}
                data={data}
                monthId={monthId}
                year={year}
              />
            ))
          )}
        </View>
      </ScrollView>
    </GeneralBottomSheetList>
  );
};

export default ChartsBottomSheetList;
