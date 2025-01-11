import { useFinanceForm } from '@/contexts/FinanceFormContext';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '@clerk/clerk-expo';
import { addFinance, updateFinance } from '@/supabase/supabase.requests';
import { useFinanceStore } from '@/store/useFinanceStore';

// TODO: remove re-renderin on every change in the form
const useHeaderActions = () => {
  console.log('useHeaderActions called');
  const { financeForm, resetFinanceForm } = useFinanceForm();
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addFinance: addFinanceToStore, updateFinance: updateFinanceInStore } =
    useFinanceStore();

  useEffect(() => {
    console.log('loading header actions', loading);
  }, [loading]);

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

  return {
    loading,
    handleAddFinance,
    handleUpdateFinance,
    onLeaveWithUnsavedChanges,
  };
};

export default useHeaderActions;
