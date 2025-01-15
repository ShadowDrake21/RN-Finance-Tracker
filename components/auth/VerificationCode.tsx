import { StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useVerification } from '@/contexts/VerificationContext';
import { STYLES } from '@/constants/styles';
import CustomButton from '../ui/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomKeyboardAvoidingView from '../shared/CustomKeyboardAvoidingView';
import VerificationCell from './verification-components/VerificationCell';
import LottieView from 'lottie-react-native';

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

  useEffect(() => {
    if (type === 'reset') {
      setResetCode('');
    } else {
      setCode('');
    }
  }, []);

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
        renderCell={(cellProps) => (
          <VerificationCell
            key={cellProps.index}
            {...cellProps}
            layoutHandler={getCellOnLayoutHandler}
          />
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
});
