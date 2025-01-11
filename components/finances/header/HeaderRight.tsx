import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import ReloadBtn from './ReloadBtn';
import SaveBtn from './SaveBtn';
import useHeaderActions from '../add-finance/hooks/useHeaderActions';
import { useFinanceForm } from '@/contexts/FinanceFormContext';

const HeaderRight = ({
  addFinance,
  updateFinance,
  loading,
}: {
  addFinance: () => Promise<void>;
  updateFinance: () => Promise<void>;
  loading: boolean;
}) => {
  // const { loading, handleAddFinance, handleUpdateFinance } = useHeaderActions();
  const { isFormChanged, isFormValid, resetFinanceForm, financeForm } =
    useFinanceForm();

  useEffect(() => {
    console.log('header right loading', loading);
  }, [loading]);

  return (
    <View style={{ flexDirection: 'row', gap: 20 }}>
      <ReloadBtn onReload={resetFinanceForm} loading={loading} />
      {isFormValid() &&
        (financeForm.action === 'edit' ? isFormChanged : true) && (
          <SaveBtn
            onSave={
              financeForm.action === 'create' ? addFinance : updateFinance
            }
            loading={loading}
          />
        )}
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
