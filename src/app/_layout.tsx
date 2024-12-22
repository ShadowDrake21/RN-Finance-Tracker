import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '@/cache';
import Toast from 'react-native-toast-message';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="month-info/[id]" />
    </Stack>
  );
};

const RootLayoutNav = () => (
  <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <ClerkLoaded>
      <RootLayout />
      <Toast />
    </ClerkLoaded>
  </ClerkProvider>
);

export default RootLayoutNav;
