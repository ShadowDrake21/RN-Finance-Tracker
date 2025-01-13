import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import GeneralBottomSheet from '../shared/GeneralBottomSheet';
import ChartsBottomSheetView from './ChartsBottomSheetView';

const ChartsBottomSheet = ({ year }: { year: number }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GeneralBottomSheet
      bottomSheetRef={bottomSheetRef}
      snapPoints={['87%']}
      pointIndex={0}
    >
      <ChartsBottomSheetView year={year} />
    </GeneralBottomSheet>
  );
};

export default ChartsBottomSheet;
