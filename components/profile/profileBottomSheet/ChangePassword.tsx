import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import PasswordChange from './components/PasswordChange';
import PasswordNotChange from './components/PasswordNotChange';

const ProfileBottomSheetlistChangePassword = () => {
  const { user } = useUser();
  const { isPasswordChange, setIsPasswordChange } = useProfileEdit();

  return user?.externalAccounts?.length === 0 ? (
    <View style={styles.passwordChangeContainer}>
      {isPasswordChange ? (
        <PasswordChange />
      ) : (
        <PasswordNotChange onPress={() => setIsPasswordChange(true)} />
      )}
    </View>
  ) : null;
};

export default ProfileBottomSheetlistChangePassword;

const styles = StyleSheet.create({
  passwordChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordChangeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
