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
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loader from '@/components/Loader';
import { callToast } from '@/utils/toasts.utils';

const Page = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { bottom } = useSafeAreaInsets();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

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

  const onSavePassword = async () => {
    setLoading(true);
    await save();
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }
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
        source={require('@/assets/animations/password.lottie')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
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
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
