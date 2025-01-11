import { View } from 'react-native';
import React, { memo, useEffect } from 'react';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import useHeaderActions from '@/components/finances/add-finance/hooks/useHeaderActions';
import Loader from '@/components/shared/Loader';
import useFetchEditFinance from '@/hooks/useFetchEditFinance';
import FinanceForm from '@/components/finance/FinanceForm';
import HeaderLeft from '@/components/finances/header/HeaderLeft';
import HeaderRight from '@/components/finances/header/HeaderRight';

type FinanceLocalParams = {
  id?: string;
  type: string;
};

const Page = () => {
  console.log('finance page');

  const { financeForm, setField, setForm } = useFinanceForm();
  const {
    loading,
    handleAddFinance,
    handleUpdateFinance,
    onLeaveWithUnsavedChanges,
  } = useHeaderActions();

  const { id, type } = useGlobalSearchParams<FinanceLocalParams>();
  const { fetchedEditFinance, loading: fetchEditLoading } = useFetchEditFinance(
    id,
    type
  );

  useEffect(() => {
    console.log('finance loading', loading);
  }, [loading]);

  useEffect(() => {
    if (fetchedEditFinance) {
      setForm({
        id: fetchedEditFinance.id,
        currency: fetchedEditFinance.currency,
        image: fetchedEditFinance.image,
        type: fetchedEditFinance.type,
        sum: fetchedEditFinance.price,
        note: fetchedEditFinance.name,
        kind: fetchedEditFinance.icon_type,
        date: new Date(fetchedEditFinance.date).toISOString(),
        action: 'edit',
      });
    }
  }, [fetchedEditFinance]);

  if (loading) return <Loader />;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderLeft
              leaveWithUnsavedChanges={onLeaveWithUnsavedChanges}
              loading={loading}
            />
          ),
          headerRight: () => (
            <HeaderRight
              addFinance={handleAddFinance}
              updateFinance={handleUpdateFinance}
              loading={loading}
            />
          ),
        }}
      />
      {fetchEditLoading ? (
        <Loader />
      ) : (
        <FinanceForm financeForm={financeForm} setField={setField} />
      )}
    </View>
  );
};

export default memo(Page);
