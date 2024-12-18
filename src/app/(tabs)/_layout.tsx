import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

const Layout = () => {
  const { isSignedIn } = useUser();

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

const styles = StyleSheet.create({});
