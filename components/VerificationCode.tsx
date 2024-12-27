import { StyleSheet, Text } from 'react-native';
import React from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useVerification } from '@/contexts/VerificationContext';
import { COLORS } from '@/constants/colors';
import LottieView from 'lottie-react-native';
import { STYLES } from '@/constants/styles';
import CustomButton from './CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomKeyboardAvoidingView from './CustomKeyboardAvoidingView';

const CELL_COUNT = 6;

const VerificationCode = ({
  type,
  onVerify,
}: {
  type: 'sign-up' | 'reset';
  onVerify: () => Promise<void>;
}) => {
  const { bottom } = useSafeAreaInsets();

  const { code, setCode, resetCode, setResetCode } = useVerification();

  const value = type === 'sign-up' ? code : resetCode;
  const setValue = type === 'sign-up' ? setCode : setResetCode;

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CustomKeyboardAvoidingView
      offset={80}
      style={[STYLES.authKeyboardAvoidingView, { paddingBottom: bottom }]}
    >
      <LottieView
        source={require('@/assets/animations/letter.lottie')}
        autoPlay
        loop
        speed={0.5}
        style={{ width: 200, height: 200 }}
      />
      <Text style={[STYLES.authSubtitle, { textAlign: 'center' }]}>
        We've sent a verification code to your email address.
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <CustomButton onPress={onVerify}>Verify</CustomButton>
    </CustomKeyboardAvoidingView>
  );
};

export default VerificationCode;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    gap: 5,
  },
  cell: {
    width: 60,
    height: 60,
    lineHeight: 48,
    fontSize: 34,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.primary,
  },
});
