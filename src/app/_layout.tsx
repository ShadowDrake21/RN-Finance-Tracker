import { LogBox, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router/stack';
import {
  ClerkProvider,
  ClerkLoaded,
  useUser,
  useSession,
} from '@clerk/clerk-expo';
import { tokenCache } from '@/cache';
import Toast from 'react-native-toast-message';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/constants/colors';
import * as SplashScreen from 'expo-splash-screen';
import { useClerkSupabaseClient } from '@/hooks/useClerkSupabaseClient';
import { FinanceFormProvider } from '@/contexts/FinanceFormContext';

SplashScreen.preventAutoHideAsync();

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);
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
      <Stack.Screen name="month-info/[id]" />
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
    </Stack>
  );
};

const RootLayoutNav = () => {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      SplashScreen.hide();
    }
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

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
