import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AnimatedPressable } from '@/utils/animation.utils';

const ReloadBtn = ({
  onReload,
  loading,
}: {
  onReload: () => void;
  loading: boolean;
}) => {
  const degrees = useSharedValue(0);

  const handleReload = () => {
    degrees.value = withTiming(degrees.value + 360, { duration: 1000 });
    onReload();
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degrees.value}deg` }],
  }));

  return (
    <AnimatedPressable
      onPress={() => handleReload()}
      style={[
        {
          padding: 5,
          backgroundColor: COLORS.primary,
          borderRadius: '50%',
        },
        loading && { backgroundColor: COLORS.disabled },
        animatedStyles,
      ]}
      disabled={loading}
    >
      <MaterialCommunityIcons name="reload" size={24} color="white" />
    </AnimatedPressable>
  );
};

export default ReloadBtn;

const styles = StyleSheet.create({});
