import React from 'react';
import { Stack } from 'expo-router';
import { VerificationProvider } from '@/contexts/VerificationContext';

const AuthLayout = () => {
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

const AuthLayoutNav = () => {
  return (
    <VerificationProvider>
      <AuthLayout />
    </VerificationProvider>
  );
};

export default AuthLayoutNav;
