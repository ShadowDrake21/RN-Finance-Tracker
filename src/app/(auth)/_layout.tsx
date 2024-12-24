import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@/constants/colors';

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(reset-password)"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
