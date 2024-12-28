import { Text, View } from 'react-native';
import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { STYLES } from '@/constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTextInput from '@/components/CustomTextInput';
import CustomButton from '@/components/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '@/utils/forms.utils';
import FormError from '@/components/FormError';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-react';
import CustomKeyboardAvoidingView from '@/components/CustomKeyboardAvoidingView';
import { CustomAlert } from '@/utils/helpers.utils';

const Page = () => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const { isSignedIn } = useAuth();
  const { isLoaded, signIn } = useSignIn();
  const [error, setError] = useState('');
  let allowedAttempts = 3;
  const [madeAttempts, setMadeAttempts] = useState(0);

  if (!isLoaded) {
    return <View />;
  }

  const create = async () => {
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: getValues().email,
      })
      .then((_) => {
        setError('');
        router.push('/verify-email');
      })
      .catch((err) => {
        setMadeAttempts((prev) => ++prev);

        if (madeAttempts < allowedAttempts) {
          const errorMessage = err.errors[0].message;
          setError(errorMessage);

          CustomAlert({
            title: 'You have encountered an error!',
            message: errorMessage,
          });
        } else {
          CustomAlert({
            title: 'Too many attempts!',
            message:
              'You have tried to verify the email too many times. Try later!',
          });

          setTimeout(() => router.replace('/sign-in'), 500);
        }
      });
  };

  const onSendCode = async () => {
    await create();
  };

  if (isSignedIn) {
    router.push('/(tabs)/dashboard');
  }

  return (
    <CustomKeyboardAvoidingView
      offset={90}
      style={[STYLES.authKeyboardAvoidingView, { paddingBottom: bottom }]}
    >
      <LottieView
        source={require('@/assets/animations/lock.lottie')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Text style={[STYLES.authSubtitle, { textAlign: 'center' }]}>
        Please enter your email address to recieve verification code.
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: EMAIL_REGEX,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            placeholder="Email"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            propStyles={{ width: '100%' }}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && (
        <View style={{ alignSelf: 'flex-start' }}>
          {errors.email.type === 'required' && (
            <FormError>Email is required.</FormError>
          )}
          {errors.email.type === 'pattern' && (
            <FormError>This is not a valid email address.</FormError>
          )}
        </View>
      )}
      <CustomButton onPress={handleSubmit(onSendCode)}>Send</CustomButton>
    </CustomKeyboardAvoidingView>
  );
};

export default Page;
