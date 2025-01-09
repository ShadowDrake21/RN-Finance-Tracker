import { LogBox, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router/stack';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '@/cache';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/constants/colors';
import * as SplashScreen from 'expo-splash-screen';
import { FinanceFormProvider } from '@/contexts/FinanceFormContext';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

LogBox.ignoreLogs(['Warning: ExpandableCalendar:']);

const RootLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="notifications"
        options={{
          presentation: 'modal',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
          title: 'Notifications',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          presentation: 'fullScreenModal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
          headerSearchBarOptions: {
            autoFocus: true,
            placeholder: 'Shopping...',
          },
          headerLargeTitle: true,
          title: 'Where is my money?',
        }}
      />
      <Stack.Screen
        name="calendar"
        options={{
          presentation: 'fullScreenModal',
          title: 'Search by date',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.dismiss()}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="finance-info/[id]"
        options={{
          presentation: 'modal',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <FinanceFormProvider>
          <RootLayout />
          <Toast />
        </FinanceFormProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
