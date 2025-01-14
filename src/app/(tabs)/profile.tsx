import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileBottomSheet from '@/components/profile/ProfileBottomSheet';

const Page = () => {
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: 'My profile',
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
        }}
      />

      <View
        style={{
          paddingTop: headerHeight + 10,
          paddingBottom: bottom + 30,
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
          <ProfileBottomSheet />
        </GestureHandlerRootView>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({});
