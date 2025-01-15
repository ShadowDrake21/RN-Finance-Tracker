import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CustomAlert } from '@/utils/helpers.utils';
import { useUser } from '@clerk/clerk-expo';

const useDeleteUser = () => {
  const { user } = useUser();

  const onDeleteProfile = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          isPreferred: true,
        },
        {
          text: 'Yes, I am sure',
          onPress: deleteProfile,
          style: 'destructive',
        },
      ]
    );
  };

  const deleteProfile = async () => {
    try {
      await user?.delete();
    } catch (error) {
      CustomAlert({
        title: 'Error',
        message: (error as { message: string }).message,
      });
    }
  };

  return { onDeleteProfile };
};

export default useDeleteUser;
