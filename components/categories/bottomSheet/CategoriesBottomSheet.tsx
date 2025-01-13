import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import GeneralBottomSheet from '@/components/shared/GeneralBottomSheet';
import CategoriesBottomSheetView from './CategoriesBottomSheetView';

const CategoriesBottomSheet = ({ category }: { category: string }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GeneralBottomSheet
      bottomSheetRef={bottomSheetRef}
      snapPoints={['87%']}
      pointIndex={0}
    >
      <CategoriesBottomSheetView category={category} />
    </GeneralBottomSheet>
  );
};

export default CategoriesBottomSheet;
