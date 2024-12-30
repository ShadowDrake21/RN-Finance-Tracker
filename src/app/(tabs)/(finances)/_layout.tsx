import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { DefaultTheme } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@/constants/colors';
import ReloadBtn from '@/components/finances/ReloadBtn';

const Layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        title: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: DefaultTheme.colors.background },
      }}
    >
      <Stack.Screen
        name="add-finance"
        options={{
          presentation: 'fullScreenModal',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                padding: 5,
                backgroundColor: COLORS.primary,
                borderRadius: '50%',
              }}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
