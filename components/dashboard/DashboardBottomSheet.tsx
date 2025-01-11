import { StyleSheet } from 'react-native';
import React, { memo, RefObject, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { IFinanceGroup } from '@/types/types';
import DashboardBottomSheetView from './DashboardBottomSheetView';

const DashboardBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

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
      <DashboardBottomSheetView bottomSheetRef={bottomSheetRef} />
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
