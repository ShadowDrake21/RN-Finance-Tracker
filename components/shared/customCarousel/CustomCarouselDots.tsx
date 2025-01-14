import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

const CustomCarouselDots = ({
  total,
  index,
  addStyles,
}: {
  total: number;
  index: number;
  addStyles?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles.dotsContainer, addStyles]}>
      {Array.from({ length: total }).map((_, dotIndex) => (
        <View
          key={dotIndex}
          style={[dotIndex === index ? styles.activeDot : styles.inactiveDot]}
        />
      ))}
    </View>
  );
};

export default CustomCarouselDots;

const styles = StyleSheet.create({
  dotsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 13,
    height: 13,
    borderRadius: 50,
  },
  inactiveDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: 13,
    height: 13,
    borderRadius: 50,
  },
});
