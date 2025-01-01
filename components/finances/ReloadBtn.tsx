import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AnimatedTouchableOpacity } from '@/utils/animation.utils';

const ReloadBtn = ({ onReload }: { onReload: () => void }) => {
  const degrees = useSharedValue(0);

  const handleReload = () => {
    degrees.value = withTiming(degrees.value + 360, { duration: 1000 });
    onReload();
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degrees.value}deg` }],
  }));

  return (
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
  );
};

export default ReloadBtn;

const styles = StyleSheet.create({});
