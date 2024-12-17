import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router/stack';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
