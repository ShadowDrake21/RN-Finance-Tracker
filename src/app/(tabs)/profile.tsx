import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileBottomSheet from '@/components/profile/ProfileBottomSheet';
import Feather from '@expo/vector-icons/Feather';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Page = () => {
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();
  const { setIsEditing, isEditing, resetField } = useProfileEdit();

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: 'My profile',
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
          headerRight: () =>
            isEditing ? (
              <View style={{ gap: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsEditing((prev) => !prev);
                    resetField();
                  }}
                >
                  <MaterialCommunityIcons
                    name="cancel"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsEditing((prev) => !prev)}>
                  <Entypo name="save" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setIsEditing((prev) => !prev)}>
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
            ),
        }}
      />
      {/* 
? <View>
              <TouchableOpacity onPress={() => setIsEditing((prev) => !prev)}>
              <MaterialCommunityIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditing((prev) => !prev)}>
                <Entypo name="save" size={24} color="black" />
                </TouchableOpacity>
                :  */}

      <View
        style={{
          paddingTop: headerHeight + 10,
          paddingBottom: bottom + 0,
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
