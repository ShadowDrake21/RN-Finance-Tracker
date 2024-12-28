import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { COLORS } from '@/constants/colors';

const CustomButton = ({
  onPress,
  children,
  disabled = false,
}: {
  onPress: () => void;
  children: PropsWithChildren<string>;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[styles.button, disabled && { backgroundColor: COLORS.disabled }]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontWeight: '600', color: '#fff', fontSize: 16 },
});
