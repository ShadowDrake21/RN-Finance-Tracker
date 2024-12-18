import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '@/constants/colors';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SocialButton from '@/components/SocialButton';
import CustomButton from '@/components/CustomButton';
import { useSignUp } from '@clerk/clerk-expo';

const Page = () => {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const onSignUp = async () => {
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      return;
    }

    // Start sign-up process using email and password provided
    try {
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

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Whoops!', err.message, [{ text: 'OK, got it' }]);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(tabs)/dashboard');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert('Whoops!', 'Something went wrong!', [
          { text: 'OK, got it' },
        ]);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert('Whoops!', err.message, [{ text: 'OK, got it' }]);
    }
  };

  const checkDisabled = () =>
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword;

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.main }}
      contentContainerStyle={{
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center',
        backgroundColor: COLORS.main,
      }}
    >
      {pendingVerification ? (
        <>
          <View style={{ marginBottom: 20, gap: 15 }}>
            <Text
              style={{
                fontWeight: '800',
                fontSize: 34,
                letterSpacing: 0.4,
              }}
            >
              Verify Your Email
            </Text>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 22,
                letterSpacing: 0.5,
              }}
            >
              We've sent a verification code to your email address.
            </Text>
          </View>
          <TextInput
            value={code}
            autoFocus
            placeholder="Enter your verification code"
            style={[styles.input, { marginBottom: 20 }]}
            placeholderTextColor={COLORS.placeholder}
            keyboardType="number-pad"
            onChangeText={setCode}
          />
          <CustomButton text="Verify" onPress={onVerifyPress} />
        </>
      ) : (
        <>
          <View style={{ marginBottom: 50, gap: 15 }}>
            <Text
              style={{ fontWeight: '800', fontSize: 34, letterSpacing: 0.4 }}
            >
              Start Your Journey to Financial Freedom
            </Text>
            <Text
              style={{ fontWeight: '600', fontSize: 22, letterSpacing: 0.5 }}
            >
              Register today and take control of your financial future.
            </Text>
          </View>
          <KeyboardAvoidingView
            style={{ gap: 15, marginBottom: 20 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
          >
            <TextInput
              autoFocus
              placeholder="Name"
              style={styles.input}
              placeholderTextColor={COLORS.placeholder}
              onChangeText={setName}
              autoCapitalize="words"
              value={name}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor={COLORS.placeholder}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <TextInput
              placeholder="Confirm password"
              style={styles.input}
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            <CustomButton
              onPress={onSignUp}
              text="Sign Up"
              disabled={checkDisabled() || !isLoaded || pendingVerification}
            />
          </KeyboardAvoidingView>

          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Text style={styles.separatorText}>or</Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.socialContainer}>
            <SocialButton icon="google" label="Sign Up with " />
            <SocialButton icon="apple1" label="Sign Up with " />
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'center', gap: 5 }}
          >
            <Text style={{ fontWeight: '600', alignSelf: 'center' }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.replace('/sign-in')}>
              <Text style={{ fontWeight: '600', color: COLORS.primary }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
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
  socialContainer: {
    gap: 15,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
