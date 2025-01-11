import { StyleSheet, View } from 'react-native';
import React, { memo, RefObject } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CustomActivityIndicator from '../ui/CustomActivityIndicator';
import DashboardBottomSheetList from './DashboardBottomSheetList';
import { IFinanceGroup } from '@/types/types';

type DashboardBottomSheetProps = {
  loading: boolean;
  refreshFinances: () => Promise<void>;
  handleLoadMore: () => void;
  groups: IFinanceGroup[];
  bottomSheetRef: RefObject<BottomSheet>;
};

const DashboardBottomSheet = ({
  loading,
  refreshFinances,
  handleLoadMore,
  groups,
  bottomSheetRef,
}: DashboardBottomSheetProps) => {
  console.log('DashboardBottomSheet render');

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['60%', '85%']}
      index={1}
      handleStyle={{ paddingTop: 10, paddingBottom: 0 }}
      containerStyle={{ paddingBottom: 75 }}
      style={styles.container}
      enableDynamicSizing={false}
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
            refreshFinances={refreshFinances}
            handleLoadMore={handleLoadMore}
            listLoading={loading}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default memo(DashboardBottomSheet);

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
