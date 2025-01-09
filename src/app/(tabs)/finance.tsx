import { View } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import useHeaderActions from '@/components/finances/add-finance/hooks/useHeaderActions';
import Loader from '@/components/shared/Loader';
import useFetchEditFinance from '@/hooks/useFetchEditFinance';
import FinanceForm from '@/components/finance/FinanceForm';

type FinanceLocalParams = {
  id?: string;
  type: string;
};

const Page = () => {
  const { financeForm, setField, setForm } = useFinanceForm();
  const { headerLeft, headerRight, loading } = useHeaderActions();

  const { id, type } = useLocalSearchParams<FinanceLocalParams>();
  const { fetchedEditFinance, loading: fetchEditLoading } = useFetchEditFinance(
    id,
    type
  );

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
          headerLeft: headerLeft,
          headerRight: headerRight,
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

export default Page;
