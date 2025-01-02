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
import { useFinanceForm } from '@/contexts/FinanceFormContext';

const SaveBtn = ({ onSave }: { onSave: () => Promise<void> }) => {
  const pulseValue = useSharedValue(1);
  const { financeForm } = useFinanceForm();

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
        animatedStyles,
      ]}
      onPress={() => onSave()}
    >
      <AntDesign name="save" size={24} color="white" />
    </AnimatedTouchableOpacity>
  );
};

export default SaveBtn;

// const styles = StyleSheet.create({});
