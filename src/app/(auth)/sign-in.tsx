import {
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

const Page = () => {
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)/dashboard');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, email, password]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 50, gap: 15 }}>
        <Text style={STYLES.authTitle}>Sign In and Start Saving</Text>
        <Text style={STYLES.authSubtitle}>
          Good to see you! Your financial goals are just a step away.
        </Text>
      </View>
      <View style={{ gap: 15, marginBottom: 20 }}>
        <TextInput
          autoFocus
          placeholder="Email"
          style={styles.input}
          placeholderTextColor={COLORS.placeholder}
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <Link href={'/reset-password'} style={{ marginBottom: 30 }} asChild>
        <Text style={{ fontWeight: '600', alignSelf: 'flex-end' }}>
          Forgot Password?
        </Text>
      </Link>

      <CustomButton onPress={onSignIn} text="Sign In" />

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separator} />
      </View>
      <View style={{ gap: 15, marginBottom: 40 }}>
        <SocialButton icon="google" label="Sign In with " />
        <SocialButton icon="apple1" label="Sign In with " />
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
