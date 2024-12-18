import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const Layout = () => {
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
      <Stack.Screen name="reset-password" options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
