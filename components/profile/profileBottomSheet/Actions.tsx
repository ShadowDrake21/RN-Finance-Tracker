import React from 'react';

import CustomButton from '@/components/ui/CustomButton';
import { COLORS } from '@/constants/colors';
import useDeleteUser from '@/hooks/useDeleteUser';
import { useAuth } from '@clerk/clerk-expo';
import ProfileBottomSheetlistChangePassword from './ChangePassword';

const ProfileBottomSheetListActions = () => {
  const { onDeleteProfile } = useDeleteUser();
  const { signOut } = useAuth();

  return (
    <>
      <ProfileBottomSheetlistChangePassword />
      <CustomButton
        style={{ marginBottom: 10, backgroundColor: COLORS.selected }}
        onPress={() => onDeleteProfile()}
      >
        Delete Profile
      </CustomButton>
      <CustomButton onPress={() => signOut()}>Sign Out</CustomButton>
    </>
  );
};

export default ProfileBottomSheetListActions;
