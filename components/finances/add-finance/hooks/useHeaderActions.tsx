import { COLORS } from '@/constants/colors';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import ReloadBtn from '../../ReloadBtn';
import SaveBtn from '../../SaveBtn';
import AntDesign from '@expo/vector-icons/AntDesign';

const useHeaderActions = () => {
  const { resetFinanceForm, isFormValid, isFormDirty } = useFinanceForm();
  const router = useRouter();

  const onLeaveWithUnsavedChanges = useCallback(() => {
    return Alert.alert('Are you sure?', 'All changes will be lost', [
      {
        text: 'Cancel',
        style: 'cancel',
        isPreferred: true,
      },
      {
        text: "Yes, I'm sure",
        style: 'destructive',
        onPress: () => {
          router.back();
          setTimeout(() => {
            resetFinanceForm();
          }, 0);
        },
      },
    ]);
  }, [router, resetFinanceForm]);

  const headerRight = useCallback(
    () => (
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <ReloadBtn onReload={resetFinanceForm} />
        {isFormValid() && <SaveBtn />}
      </View>
    ),
    [resetFinanceForm, isFormValid]
  );

  const headerLeft = useCallback(
    () => (
      <TouchableOpacity
        onPress={isFormDirty() ? onLeaveWithUnsavedChanges : router.back}
        style={{
          padding: 5,
          backgroundColor: COLORS.primary,
          borderRadius: '50%',
        }}
      >
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>
    ),
    [isFormDirty, onLeaveWithUnsavedChanges, router]
  );

  return { headerLeft, headerRight };
};

export default useHeaderActions;
