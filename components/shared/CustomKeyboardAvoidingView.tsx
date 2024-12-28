import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, { PropsWithChildren } from 'react';

interface CustomKeyboardAvoidingViewProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  offset: number;
}

const CustomKeyboardAvoidingView = ({
  children,
  style,
  offset,
}: CustomKeyboardAvoidingViewProps) => {
  return (
    <KeyboardAvoidingView
      style={style}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? offset : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default CustomKeyboardAvoidingView;
