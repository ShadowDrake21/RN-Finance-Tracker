import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

type TypeSwitchProps = {
  type: 'expense' | 'income';
  setType: React.Dispatch<React.SetStateAction<'expense' | 'income'>>;
};

const SwitchItem = ({
  type,
  setType,
  isActive,
}: TypeSwitchProps & { isActive: boolean }) => (
  <Pressable
    onPress={() => setType(type)}
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

const TypeSwitch = ({ type, setType }: TypeSwitchProps) => {
  return (
    <View style={{ alignSelf: 'center' }}>
      <View style={styles.switchWrapper}>
        <SwitchItem
          type="expense"
          setType={setType}
          isActive={type === 'expense'}
        />
        <SwitchItem
          type="income"
          setType={setType}
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
