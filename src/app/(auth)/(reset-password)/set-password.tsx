import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/ui/CustomButton';
import CustomTextInput from '@/components/ui/CustomTextInput';
import FormError from '@/components/ui/FormError';
import { STYLES } from '@/constants/styles';
import LottieView from 'lottie-react-native';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loader from '@/components/shared/Loader';
import { callToast } from '@/utils/toasts.utils';
import CustomKeyboardAvoidingView from '@/components/shared/CustomKeyboardAvoidingView';
import { CustomAlert } from '@/utils/helpers.utils';

const Page = () => {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const { bottom } = useSafeAreaInsets();

  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (isError) {
      reset();
      setIsError(false);
    }
  }, [isError]);

  const save = async () => {
    await signIn
      ?.resetPassword({ password: getValues().password })
      .then((result) => {
        if (result.status === 'complete') {
          setActive({ session: result.createdSessionId }).then(() => {
            router.replace('/(tabs)/dashboard');
            callToast({
              type: 'success',
              text1: 'Password reset successful!',
              text2: 'You can now sign in with new password.',
            });
          });
        } else {
          setIsError(true);
          callToast({
            type: 'error',
            text1: 'Password reset failed!',
            text2: 'Please try again or contact support if the issue persists.',
          });
        }
      })
      .catch((err) => {
        const errorMessage = err.errors[0].longMessage;
        setIsError(true);
        CustomAlert({
          title: 'You have encountered an error!',
          message: errorMessage,
        });
      });
  };

  const onSavePassword = async () => {
    setLoading(true);
    await save();
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <CustomKeyboardAvoidingView
      offset={100}
      style={[STYLES.authKeyboardAvoidingView, { paddingBottom: bottom }]}
    >
      <LottieView
        source={require('@/assets/animations/password.lottie')}
        autoPlay
        loop
        style={{ width: 200, height: 130 }}
      />
      <Text style={[STYLES.authSubtitle, { textAlign: 'center' }]}>
        Please enter your email address to recieve verification code.
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 8,
          maxLength: 25,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            placeholder="Password"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            secureTextEntry={true}
            propStyles={{ width: '100%' }}
          />
        )}
        name="password"
      />
      {errors.password && (
        <View style={{ alignSelf: 'flex-start' }}>
          {errors.password.type === 'required' && (
            <FormError>Password is required.</FormError>
          )}
          {errors.password.type === 'minLength' && (
            <FormError>Password must be at least 8 characters long.</FormError>
          )}
          {errors.password.type === 'maxLength' && (
            <FormError>Password cannot be longer than 25 characters.</FormError>
          )}
        </View>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
          validate: (value) => {
            return value === getValues('password') || 'Passwords do not match.';
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            placeholder="Confirm Password"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            secureTextEntry={true}
            propStyles={{ width: '100%' }}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <View style={{ alignSelf: 'flex-start' }}>
          {errors.confirmPassword.type === 'required' && (
            <FormError>Confirm Password is required.</FormError>
          )}
          {errors.confirmPassword.type === 'validate' && (
            <FormError>{errors.confirmPassword.message!}</FormError>
          )}
        </View>
      )}

      <CustomButton onPress={handleSubmit(onSavePassword)}>Save</CustomButton>
    </CustomKeyboardAvoidingView>
  );
};

export default Page;
