import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { COLORS } from '@/constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import CreateTabBar from '@/components/ui/CreateTabBar';
import { BlurView } from 'expo-blur';

import { DefaultTheme } from '@react-navigation/native';
import Loader from '@/components/shared/Loader';
import { ProfileEditProvider } from '@/contexts/ProfileEditContext';

const TabsLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sign-in'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: COLORS.tabBarTintInactive,
        tabBarActiveTintColor: COLORS.tabBarTintActive,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => {
          return <BlurView intensity={80} style={{ flex: 1 }} />;
        },
        animation: 'shift',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
          tabBarLabel: 'Feed',
        }}
      />
      <Tabs.Screen
        name="visual-representation"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Foundation name="graph-pie" size={size} color={color} />
          ),
          tabBarLabel: 'Charts',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="finance"
        initialParams={{ type: 'create' }}
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: DefaultTheme.colors.background },
          tabBarLabel: '',
          title: '',
          tabBarButton: () => (
            <Pressable
              style={{
                position: 'relative',
                flex: 1,
                width: 60,
                height: 60,
              }}
              onPress={() =>
                router.push({
                  pathname: `/finance`,
                  params: { id: null, type: 'create' },
                })
              }
            >
              <CreateTabBar />
            </Pressable>
          ),
          tabBarIconStyle: { top: '25%' },
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismissAll()}>
              <Text>Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="appstore1" size={size} color={color} />
          ),
          tabBarLabel: 'Categories',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="manage-accounts" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
          animation: 'fade',
        }}
      />
    </Tabs>
  );
};

const Layout = () => {
  return (
    <ProfileEditProvider>
      <TabsLayout />
    </ProfileEditProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 90,
    flexDirection: 'row',
    paddingTop: 15,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
