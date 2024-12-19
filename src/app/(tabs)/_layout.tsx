import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { COLORS } from '@/constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';

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

          tabBarLabel: 'Expenses',
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
        }}
      />
    </Tabs>
  );
};

export default Layout;
