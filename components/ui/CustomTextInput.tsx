import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { COLORS } from '@/constants/colors';

const CustomTextInput = ({
  propStyles,
  ...props
}: { propStyles?: StyleProp<TextStyle> } & TextInputProps) => {
  return (
    <TextInput
      style={[styles.input, propStyles]}
      placeholderTextColor={COLORS.gray}
      {...props}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    color: 'rgba(0, 0, 0, 0.9)',
  },
});
