import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

const OnboardingSliderLastItemBtn = ({
  bottom,
  onPress,
}: {
  bottom: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'relative',
        bottom: bottom,
        alignSelf: 'center',
      }}
    >
      <Text style={[styles.controlBtn, { color: COLORS.primary }]}>
        Get Started!
      </Text>
    </TouchableOpacity>
  );
};

export default OnboardingSliderLastItemBtn;

const styles = StyleSheet.create({
  controlBtn: {
    width: '100%',
    textTransform: 'uppercase',
    fontSize: 16,
  },
});
