import { Pressable } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { DefaultTheme } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="verify-email"
        options={{
          title: 'Verify Your Email Verification',
          presentation: 'modal',
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
      />
    </Stack>
  );
};

export default Layout;
