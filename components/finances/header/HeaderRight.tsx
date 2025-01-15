import { StyleSheet, View } from 'react-native';
import React from 'react';
import ReloadBtn from './ReloadBtn';
import SaveBtn from './SaveBtn';
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
  const { isFormChanged, isFormValid, resetFinanceForm, financeForm } =
    useFinanceForm();

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 20 },
});
