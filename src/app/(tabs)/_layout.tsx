import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Tabs, useRouter, useSegments } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { COLORS } from '@/constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import CreateTabBar from '@/components/ui/CreateTabBar';
import { BlurView } from 'expo-blur';

const Layout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const segment = useSegments();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
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
        }}
      />
      <Tabs.Screen
        name="(finances)"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <CreateTabBar isActive={focused} />,
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
