import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '@/constants/colors';
import { useRouter } from 'expo-router';
import SocialButton from '@/components/auth/SocialButton';
import CustomButton from '@/components/ui/CustomButton';
import { useSignUp } from '@clerk/clerk-expo';
import { useForm } from 'react-hook-form';
import { STYLES } from '@/constants/styles';
import Loader from '@/components/shared/Loader';
import SignUpForm from '@/components/sign-up/SignUpForm';
import { SignUpFormType } from '@/types/types';
import CustomKeyboardAvoidingView from '@/components/shared/CustomKeyboardAvoidingView';
import { CustomAlert } from '@/utils/helpers.utils';

const Page = () => {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSignUp = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const { name, email, password } = getValues();
      !!name.split(' ')[1]
        ? await signUp.create({
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1] || '',
            emailAddress: email,
            password,
          })
        : await signUp.create({
            firstName: name.split(' ')[0],
            emailAddress: email,
            password,
          });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      router.push('/sign-up/verify-email');
    } catch (err: any) {
      CustomAlert({
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.lightGray }}
      contentContainerStyle={styles.container}
    >
      <View style={{ marginBottom: 50, gap: 15 }}>
        <Text style={STYLES.authTitle}>
          Start Your Journey to Financial Freedom
        </Text>
        <Text style={STYLES.authSubtitle}>
          Register today and take control of your financial future.
        </Text>
      </View>
      <CustomKeyboardAvoidingView
        style={{ gap: 15, marginBottom: 20 }}
        offset={30}
      >
        <SignUpForm control={control} errors={errors} getValues={getValues} />
        <CustomButton onPress={handleSubmit(onSignUp)}>Sign Up</CustomButton>
      </CustomKeyboardAvoidingView>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separator} />
      </View>
      <View style={styles.socialContainer}>
        <SocialButton
          icon="google"
          label="Sign Up with "
          type="google"
          setLoading={setLoading}
        />
        <SocialButton
          icon="apple1"
          label="Sign Up with "
          type="apple"
          setLoading={setLoading}
        />
      </View>

      <View style={styles.haveAccountContainer}>
        <Text style={styles.haveAccountText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.replace('/sign-in')}>
          <Text style={styles.haveAccountBtnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
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
  socialContainer: {
    gap: 15,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  haveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  haveAccountText: { fontWeight: '600', alignSelf: 'center' },
  haveAccountBtnText: { fontWeight: '600', color: COLORS.primary },
});
