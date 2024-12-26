import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';
import { onboardingItems } from '@/static/onboarding.static';
import Carousel from 'pinar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OnboardingButton from './OnboardingButton';

const OnboardingButtons = ({
  carouselRef,
  isLastItem,
}: {
  carouselRef: React.MutableRefObject<Carousel | null>;
  isLastItem: boolean;
}) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.controlsContainer, { bottom: bottom }]}>
      <OnboardingButton
        btnProps={{
          onPress: () => {
            if (carouselRef.current && !isLastItem) {
              carouselRef.current?.scrollToIndex({
                index: onboardingItems.length - 1,
                animated: true,
              });
            }
          },
          style: isLastItem ? { opacity: 0 } : {},
        }}
        labelProps={{ style: styles.controlBtn }}
      >
        Skip
      </OnboardingButton>

      <OnboardingButton
        btnProps={{
          onPress: () => {
            carouselRef.current && carouselRef.current?.scrollToNext();
          },
          style: isLastItem ? { opacity: 0 } : {},
        }}
        labelProps={{ style: [styles.controlBtn, { color: COLORS.primary }] }}
      >
        Next
      </OnboardingButton>
    </View>
  );
};

export default OnboardingButtons;

const styles = StyleSheet.create({
  controlsContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlBtn: {
    width: '100%',
    textTransform: 'uppercase',
    fontSize: 16,
  },
});
