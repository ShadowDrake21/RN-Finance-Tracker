import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { PropsWithChildren } from 'react';
import { COLORS } from '@/constants/colors';

const CustomButton = ({
  onPress,
  children,
  disabled = false,
  style = { backgroundColor: COLORS.primary },
}: {
  onPress: () => void;
  children: PropsWithChildren<string>;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        { backgroundColor: COLORS.primary },
        style,
        disabled && { backgroundColor: COLORS.disabled },
      ]}
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
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontWeight: '600', color: '#fff', fontSize: 16 },
});
