import { StyleSheet, View } from 'react-native';
import React, { RefObject } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CustomActivityIndicator from '../ui/CustomActivityIndicator';
import { useFetchFinancesByMonth } from '@/hooks/fetch-finances-by-month.hook';
import DashboardBottomSheetList from './DashboardBottomSheetList';

type DashboardBottomSheetProps = {
  selectedMonthId: string;
  bottomSheetRef: RefObject<BottomSheet>;
};

const DashboardBottomSheet = ({
  selectedMonthId,
  bottomSheetRef,
}: DashboardBottomSheetProps) => {
  const { groups, handleLoadMore, loading } =
    useFetchFinancesByMonth(selectedMonthId);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['60%', '85%']}
      index={1}
      handleStyle={{ paddingTop: 10, paddingBottom: 0 }}
      containerStyle={{ paddingBottom: 75 }}
      style={styles.container}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={{ flex: 1, width: '100%' }}>
          {loading && (
            <CustomActivityIndicator
              size="large"
              style={{ marginVertical: 20 }}
            />
          )}
          <DashboardBottomSheetList
            bottomSheetRef={bottomSheetRef}
            groups={groups}
            handleLoadMore={handleLoadMore}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default DashboardBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
});
