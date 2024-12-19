import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomTextInput from '@/components/CustomTextInput';
import FormError from '@/components/FormError';
import { STYLES } from '@/constants/styles';
import { EMAIL_REGEX } from '@/utils/forms.utils';
import LottieView from 'lottie-react-native';
import { Controller } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { bottom } = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const verify = async () => {
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'needs_new_password') {
          // Set the active session to
          // the newly created session (user is now signed in)
          router.replace('/set-password');
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  };

  const onVerify = async () => {
    await verify();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        gap: 20,
        alignItems: 'center',
        paddingBottom: bottom,
        paddingHorizontal: 20,
      }}
    >
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
      <CustomTextInput
        placeholder="Verification Code"
        onChangeText={setCode}
        value={code}
        propStyles={{ width: '100%' }}
        autoCapitalize="none"
        keyboardType="number-pad"
        textContentType="oneTimeCode"
      />

      <CustomButton onPress={onVerify}>Verify</CustomButton>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
