import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import SwitchItem from './SwitchItem';

const TypeSwitch = () => {
  const {
    financeForm: { type },
    setField,
  } = useFinanceForm();
  return (
    <View style={{ alignSelf: 'center' }}>
      <View style={styles.switchWrapper}>
        <SwitchItem
          type="expense"
          setField={setField}
          isActive={type === 'expense'}
        />
        <SwitchItem
          type="income"
          setField={setField}
          isActive={type === 'income'}
        />
      </View>
    </View>
  );
};

export default TypeSwitch;

const styles = StyleSheet.create({
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.lightPrimary,
    borderRadius: 20,
  },
});
