import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import SocialButton from '@/components/SocialButton';

const Page = () => {
  const router = useRouter();

  const onSignIn = () => {
    console.log('Sign In');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center',
        backgroundColor: COLORS.main,
      }}
    >
      <View style={{ marginBottom: 50, gap: 15 }}>
        <Text style={{ fontWeight: '800', fontSize: 34, letterSpacing: 0.4 }}>
          Sign In and Start Saving
        </Text>
        <Text style={{ fontWeight: '600', fontSize: 22, letterSpacing: 0.5 }}>
          Good to see you! Your financial goals are just a step away.
        </Text>
      </View>
      <View style={{ gap: 15, marginBottom: 20 }}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor={COLORS.placeholder}
          autoFocus
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={true}
        />
      </View>
      <Link href={'/reset-password'} style={{ marginBottom: 30 }} asChild>
        <Text style={{ fontWeight: '600', alignSelf: 'flex-end' }}>
          Forgot Password?
        </Text>
      </Link>

      <TouchableOpacity
        onPress={onSignIn}
        style={{
          width: '100%',
          padding: 15,
          backgroundColor: COLORS.primary,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontWeight: '600', color: '#fff', fontSize: 16 }}>
          Sign In
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginVertical: 25,
        }}
      >
        <View style={styles.separator} />
        <Text style={{ marginHorizontal: 10, fontWeight: '700', fontSize: 16 }}>
          or
        </Text>
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
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    color: 'rgba(0, 0, 0, 0.9)',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#000',
  },
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
