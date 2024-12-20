import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { COLORS } from '@/constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import CreateTabBar from '@/components/CreateTabBar';
import { BlurView } from 'expo-blur';

const Layout = () => {
  const { isSignedIn, isLoaded } = useAuth();

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
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          position: 'absolute',
          height: 90,
          flexDirection: 'row',
          paddingTop: 15,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarBackground: () => {
          return <BlurView intensity={80} style={{ flex: 1 }} />;
        },
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
        name="(expenses)"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => <CreateTabBar />,
          tabBarIconStyle: { top: '25%' },
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
