import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS } from '@/constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedTouchableOpacity } from '@/utils/animation.utils';

const SaveBtn = ({
  onSave,
  loading,
}: {
  onSave: () => Promise<void>;
  loading: boolean;
}) => {
  const pulseValue = useSharedValue(1);

  useEffect(() => {
    pulseValue.value = withRepeat(withTiming(1.2, { duration: 500 }), -1, true);
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
  }));

  return (
    <AnimatedTouchableOpacity
      style={[
        {
          padding: 5,
          backgroundColor: COLORS.extraDarkPrimary,
          borderRadius: '50%',
        },
        loading && { backgroundColor: COLORS.lightGray },
        animatedStyles,
      ]}
      onPress={() => onSave()}
      disabled={loading}
    >
      <AntDesign name="save" size={24} color="white" />
    </AnimatedTouchableOpacity>
  );
};

export default SaveBtn;

// const styles = StyleSheet.create({});
