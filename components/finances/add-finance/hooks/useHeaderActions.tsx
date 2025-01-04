import { COLORS } from '@/constants/colors';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import ReloadBtn from '../../ReloadBtn';
import SaveBtn from '../../SaveBtn';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useAuth } from '@clerk/clerk-expo';
import { addFinance } from '@/supabase/supabase.requests';

const useHeaderActions = () => {
  const { financeForm, resetFinanceForm, isFormValid, isFormDirty } =
    useFinanceForm();
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddFinance = async () => {
    if (!userId) return;

    setLoading(true);
    const token = await getToken({ template: 'supabase' });

    if (!token) {
      Alert.alert('Error', 'Failed to retrieve token');
      setLoading(false);
      return;
    }

    await addFinance({ userId, token, finance: financeForm });

    router.back();
    resetFinanceForm();
    setLoading(false);
  };

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
        {isFormValid() && <SaveBtn onSave={handleAddFinance} />}
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

  return { headerLeft, headerRight, loading };
};

export default useHeaderActions;
