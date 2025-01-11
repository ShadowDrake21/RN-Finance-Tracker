import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[year]" />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
