import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { STYLES } from '@/constants/styles';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { COLORS } from '@/constants/colors';
import { callToast } from '@/utils/toasts.utils';

const CELL_COUNT = 6;

const Page = () => {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { bottom } = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const verify = async () => {
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
      })
      .then((result) => {
        if (result.status === 'needs_new_password') {
          router.replace('/set-password');
          setError('');
        } else {
          setError('Code verification failed. Please try again.');
          callToast({
            type: 'error',
            text1: 'Code verification failed',
            text2: 'Please try again or contact support if the issue persists.',
          });
        }
      })
      .catch((err) => {
        setError(err.errors[0].longMessage);
        Alert.alert('You have encountered an error!', error, [
          { text: 'OK', style: 'destructive' },
        ]);
      });
  };

  const onVerify = async () => {
    await verify();
  };

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <LottieView
        source={require('@/assets/animations/letter.lottie')}
        autoPlay
        loop
        speed={0.5}
        style={{ width: 200, height: 200 }}
      />
      <Text style={[STYLES.authSubtitle, { textAlign: 'center' }]}>
        Please enter your email address to recieve verification code.
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={'one-time-code'}
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
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',

    paddingHorizontal: 20,
  },
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
