import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import SocialButton from '@/components/SocialButton';
import CustomButton from '@/components/CustomButton';
import { useSignIn } from '@clerk/clerk-expo';
import { STYLES } from '@/constants/styles';
import { Controller, useForm } from 'react-hook-form';
import CustomTextInput from '@/components/CustomTextInput';
import FormError from '@/components/FormError';
import { callToast } from '@/utils/toasts.utils';
import { useSocialAuth } from '@/utils/auth.utils';

const Page = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSignIn = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const { email, password } = getValues();
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        console.log('User is signed in');

        router.replace('/(tabs)/dashboard');
      } else {
        callToast({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Try again, maybe that will work!',
        });
      }
    } catch (err: any) {
      Alert.alert('Whoops!', err.message, [{ text: 'OK, got it' }]);
    }
  }, [isLoaded, getValues]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 50, gap: 15 }}>
        <Text style={STYLES.authTitle}>Sign In and Start Saving</Text>
        <Text style={STYLES.authSubtitle}>
          Good to see you! Your financial goals are just a step away.
        </Text>
      </View>
      <View style={{ gap: 15, marginBottom: 20 }}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              placeholder="Email"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email && (
          <>
            {errors.email.type === 'required' && (
              <FormError>Email is required.</FormError>
            )}
            {errors.email.type === 'pattern' && (
              <FormError>This is not a valid email address.</FormError>
            )}
          </>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              placeholder="Password"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        {errors.password && (
          <>
            {errors.password.type === 'required' && (
              <FormError>Password is required.</FormError>
            )}
          </>
        )}
      </View>
      <Link href={'/reset-password'} style={{ marginBottom: 30 }} asChild>
        <Text style={{ fontWeight: '600', alignSelf: 'flex-end' }}>
          Forgot Password?
        </Text>
      </Link>

      <CustomButton onPress={handleSubmit(onSignIn)} text="Sign In" />

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separator} />
      </View>
      <View style={{ gap: 15, marginBottom: 40 }}>
        <SocialButton
          icon="google"
          label="Sign In with "
          type="google"
          setLoading={setLoading}
        />
        <SocialButton
          icon="apple1"
          label="Sign In with "
          type="apple"
          setLoading={setLoading}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
        <Text style={{ fontWeight: '600', alignSelf: 'center' }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => router.replace('/sign-up')}>
          <Text style={{ fontWeight: '600', color: COLORS.primary }}>
            Register Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    color: 'rgba(0, 0, 0, 0.9)',
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 25,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#000',
  },
  separatorText: { marginHorizontal: 10, fontWeight: '700', fontSize: 16 },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    padding: 15,
    gap: 5,
  },
  socialText: { fontSize: 16, fontWeight: '600' },
});
