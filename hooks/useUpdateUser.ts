import { Alert } from 'react-native';
import { CustomAlert } from '@/utils/helpers.utils';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import { useUser } from '@clerk/clerk-expo';

const useUpdateUser = () => {
  const { user } = useUser();
  const { password, setIsPasswordChange, resetField } = useProfileEdit();

  const onCancelPress = () => {
    resetField('password');
    setIsPasswordChange(false);
  };

  const onChangePassword = () => {
    Alert.prompt(
      'Current Password',
      'Please enter your current password',
      [
        {
          text: 'Cancel',
          onPress: onCancelPress,
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: (currentPassword) => {
            changePassword(currentPassword);
          },
        },
      ],
      'secure-text'
    );
  };

  const changePassword = async (currentPassword: string | undefined) => {
    try {
      await user?.updatePassword({ currentPassword, newPassword: password });
      CustomAlert({
        title: 'Password changed!',
        message: 'From now on, use your new password to sign in.',
      });
    } catch (error) {
      CustomAlert({
        title: 'Error',
        message: (error as { message: string }).message,
      });
    } finally {
      resetField('password');
      setIsPasswordChange(false);
    }
  };

  return { onChangePassword };
};

export default useUpdateUser;
