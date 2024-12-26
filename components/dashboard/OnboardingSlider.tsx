import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import Carousel from 'pinar';
import { onboardingItems } from '@/static/onboarding.static';
import OnboardingSliderItem from './OnboardingSliderItem';

const OnboardingSlider = ({
  carouselRef,
  isLastItem,
  setIsLastItem,
  setIsLoading,
}: {
  carouselRef: React.MutableRefObject<Carousel | null>;
  isLastItem: boolean;
  setIsLastItem: (a: boolean) => void;
  setIsLoading: (a: boolean) => void;
}) => {
  const router = useRouter();

  const { bottom } = useSafeAreaInsets();

  const skipToAuth = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.replace('(auth)/sign-in');
    }, 300);
  };

  return (
    <Carousel
      ref={carouselRef}
      showsControls={false}
      onIndexChanged={({ index, total }): void => {
        const page = index + 1;
        if (page === total && !isLastItem) {
          setIsLastItem(true);
        } else {
          setIsLastItem(false);
        }
      }}
      renderDots={({ index, total }) => {
        if (isLastItem) {
          return (
            <TouchableOpacity
              onPress={skipToAuth}
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
        } else {
          return (
            <View style={[styles.dotsContainer, { bottom: bottom }]}>
              {Array.from({ length: total }).map((_, dotIndex) => (
                <View
                  key={dotIndex}
                  style={[
                    dotIndex === index ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          );
        }
      }}
    >
      {onboardingItems.map((item, index) => (
        <OnboardingSliderItem key={index} item={item} />
      ))}
    </Carousel>
  );
};

export default OnboardingSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
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
