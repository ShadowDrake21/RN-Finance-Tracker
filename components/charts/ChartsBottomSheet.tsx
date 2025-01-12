import React, { memo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import GeneralBottomSheet from '../shared/GeneralBottomSheet';
import ChartsBottomSheetView from './ChartsBottomSheetView';
import { useUser } from '@clerk/clerk-expo';

const ChartsBottomSheet = ({ year }: { year: number }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GeneralBottomSheet
      bottomSheetRef={bottomSheetRef}
      snapPoints={['87%']}
      pointIndex={0}
    >
      <ChartsBottomSheetView bottomSheetRef={bottomSheetRef} year={year} />
    </GeneralBottomSheet>
  );
};

export default ChartsBottomSheet;
