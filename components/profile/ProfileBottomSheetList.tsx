import { ScrollView, View } from 'react-native';
import React from 'react';
import GeneralBottomSheetList from '../shared/GeneralBottomSheetList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomKeyboardAvoidingView from '../shared/CustomKeyboardAvoidingView';
import ProfileBottomSheetListName from './profileBottomSheet/Name';
import ProfileBottomSheetListImage from './profileBottomSheet/Image';
import ProfileBottomSheetListImageControls from './profileBottomSheet/ImageControls';
import ProfileBottomSheetListBasicInfo from './profileBottomSheet/BasicInfo';
import ProfileBottomSheetListActions from './profileBottomSheet/Actions';

const ProfileBottomSheetList = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <GeneralBottomSheetList>
      <CustomKeyboardAvoidingView offset={150}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: bottom + 50 }}>
            <ProfileBottomSheetListName />
            <ProfileBottomSheetListImage />
            <ProfileBottomSheetListImageControls />
            <ProfileBottomSheetListBasicInfo />
            <ProfileBottomSheetListActions />
          </View>
        </ScrollView>
      </CustomKeyboardAvoidingView>
    </GeneralBottomSheetList>
  );
};

export default ProfileBottomSheetList;
