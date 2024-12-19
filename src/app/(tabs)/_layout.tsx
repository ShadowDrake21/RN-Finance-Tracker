import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { COLORS } from '@/constants/colors';

const Layout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    console.error('isSignedIn dashboard layout', isSignedIn);
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sign-in'} />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="(expenses)" />
      <Tabs.Screen name="visual-representation" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
};

export default Layout;
