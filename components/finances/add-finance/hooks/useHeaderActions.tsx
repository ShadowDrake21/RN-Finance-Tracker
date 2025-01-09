import { COLORS } from '@/constants/colors';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import ReloadBtn from '../../ReloadBtn';
import SaveBtn from '../../SaveBtn';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useAuth } from '@clerk/clerk-expo';
import { addFinance, updateFinance } from '@/supabase/supabase.requests';
import { useFinanceStore } from '@/store/useFinanceStore';

const useHeaderActions = () => {
  const {
    financeForm,
    resetFinanceForm,
    isFormValid,
    isFormDirty,
    isFormChanged,
  } = useFinanceForm();
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addFinance: addFinanceToStore, updateFinance: updateFinanceInStore } =
    useFinanceStore();

  const handleAddFinance = async () => {
    if (!userId) return;

    setLoading(true);
    const token = await getToken({ template: 'supabase' });

    if (!token) {
      Alert.alert('Error', 'Failed to retrieve token');
      setLoading(false);
      return;
    }

    const created = await addFinance({ userId, token, finance: financeForm });

    if (created) addFinanceToStore(created);

    router.back();
    resetFinanceForm();
    setLoading(false);
  };

  const handleUpdateFinance = async () => {
    if (!userId) return;

    setLoading(true);
    const token = await getToken({ template: 'supabase' });

    if (!token) {
      Alert.alert('Error', 'Failed to retrieve token');
      setLoading(false);
      return;
    }

    const updated = await updateFinance({
      userId,
      token,
      finance: financeForm,
    });

    if (updated) updateFinanceInStore(updated);

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
        {isFormValid() &&
          (financeForm.action === 'edit' ? isFormChanged : true) && (
            <SaveBtn
              onSave={
                financeForm.action === 'create'
                  ? handleAddFinance
                  : handleUpdateFinance
              }
            />
          )}
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
