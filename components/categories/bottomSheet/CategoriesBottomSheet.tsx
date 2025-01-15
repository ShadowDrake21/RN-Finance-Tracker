import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import GeneralBottomSheet from '@/components/shared/GeneralBottomSheet';
import GeneralBottomSheetView from '@/components/shared/GeneralBottomSheetView';
import CategoriesBottomSheetList from './CategoriesBottomSheetList';

const CategoriesBottomSheet = ({ category }: { category: string }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GeneralBottomSheet bottomSheetRef={bottomSheetRef} pointIndex={0}>
      <GeneralBottomSheetView>
        <CategoriesBottomSheetList category={category} />
      </GeneralBottomSheetView>
    </GeneralBottomSheet>
  );
};

export default CategoriesBottomSheet;
