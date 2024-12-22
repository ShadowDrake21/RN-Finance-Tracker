import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '@/cache';
import Toast from 'react-native-toast-message';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

const RootLayout = () => {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

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
