import React, { memo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import DashboardBottomSheetView from './DashboardBottomSheetView';
import GeneralBottomSheet from '../shared/GeneralBottomSheet';

const DashboardBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GeneralBottomSheet
      bottomSheetRef={bottomSheetRef}
      containerStyle={{ paddingBottom: 75 }}
    >
      <DashboardBottomSheetView bottomSheetRef={bottomSheetRef} />
    </GeneralBottomSheet>
  );
};

export default memo(DashboardBottomSheet);
