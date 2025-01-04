import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import { FinanceFormType } from '@/types/types';

type TypeSwitchProps = {
  type: 'expense' | 'income';
  setField: (field: keyof FinanceFormType, value: any) => void;
};

const SwitchItem = ({
  type,
  setField,
  isActive,
}: TypeSwitchProps & { isActive: boolean }) => (
  <Pressable
    onPress={() => setField('type', type)}
    style={[
      styles.switchContainer,
      isActive && {
        backgroundColor: COLORS.darkPrimary,
      },
    ]}
  >
    <Text
      style={[
        styles.switchText,
        isActive
          ? { color: COLORS.lightGray }
          : { color: COLORS.extraDarkPrimary },
      ]}
    >
      {type}
    </Text>
  </Pressable>
);

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
  switchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  switchText: { textTransform: 'uppercase', width: '100%', fontWeight: '700' },
});
