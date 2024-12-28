import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { DefaultTheme } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Layout = () => {
  const router = useRouter();
  const degrees = useSharedValue(0);

  const handleReload = () => {
    degrees.value = withTiming(degrees.value + 360, { duration: 1000 });
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degrees.value}deg` }],
  }));

  useEffect(() => {
    console.log(degrees);
  }, [degrees]);

  return (
    <Stack
      screenOptions={{
        title: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: DefaultTheme.colors.background },
      }}
    >
      <Stack.Screen
        name="add-expense"
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
          headerRight: () => (
            <AnimatedTouchableOpacity
              onPress={() => handleReload()}
              style={[
                {
                  padding: 5,
                  backgroundColor: COLORS.primary,
                  borderRadius: '50%',
                },
                animatedStyles,
              ]}
            >
              <MaterialCommunityIcons name="reload" size={24} color="white" />
            </AnimatedTouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
