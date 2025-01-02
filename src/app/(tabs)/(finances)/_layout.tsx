import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { DefaultTheme } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@/constants/colors';
import ReloadBtn from '@/components/finances/ReloadBtn';
import { FinanceFormProvider } from '@/contexts/FinanceFormContext';

const FinanceLayout = () => {
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
        }}
      />
    </Stack>
  );
};

export const Layout = () => <FinanceLayout />;

export default Layout;

const styles = StyleSheet.create({});
