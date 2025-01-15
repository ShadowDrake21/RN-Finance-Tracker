import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import GeneralBottomSheet from '@/components/shared/GeneralBottomSheet';
import GeneralBottomSheetView from '../shared/GeneralBottomSheetView';
import ProfileBottomSheetList from './ProfileBottomSheetList';

const ProfileBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GeneralBottomSheet bottomSheetRef={bottomSheetRef} pointIndex={0}>
      <GeneralBottomSheetView>
        <ProfileBottomSheetList />
      </GeneralBottomSheetView>
    </GeneralBottomSheet>
  );
};

export default ProfileBottomSheet;
