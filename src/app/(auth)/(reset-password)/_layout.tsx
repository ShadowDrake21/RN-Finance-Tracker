import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { DefaultTheme } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Page = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: COLORS.mainTint,
        headerTitleStyle: { fontSize: 20 },
        headerStyle: { backgroundColor: DefaultTheme.colors.background },
        headerRight: () => (
          <Pressable onPress={() => router.dismiss()}>
            <AntDesign name="closecircleo" size={26} color={'black'} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Reset Password',
        }}
      />
      <Stack.Screen
        name="verify-email"
        options={{
          title: 'Verify Your Email',
        }}
      />
      <Stack.Screen
        name="set-password"
        options={{
          title: 'Create a New Password',
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
};

export default Page;

const styles = StyleSheet.create({});
