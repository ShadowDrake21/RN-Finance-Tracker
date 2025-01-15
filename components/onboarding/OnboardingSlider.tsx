import React from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'pinar';
import { onboardingItems } from '@/static/onboarding.static';
import OnboardingSliderItem from './OnboardingSliderItem';
import OnboardingSliderLastItemBtn from './OnboardingSliderLastItemBtn';
import CustomCarousel from '../shared/CustomCarousel';
import CustomCarouselDots from '../shared/customCarousel/CustomCarouselDots';

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

  const handleOnIndexChanged = (index: number, total: number): void => {
    const page = index + 1;
    if (page === total && !isLastItem) {
      setIsLastItem(true);
    } else {
      setIsLastItem(false);
    }
  };

  const handleRenderDots = (index: number, total: number) => {
    if (isLastItem) {
      return (
        <OnboardingSliderLastItemBtn bottom={bottom} onPress={skipToAuth} />
      );
    } else {
      return (
        <CustomCarouselDots
          total={total}
          index={index}
          addStyles={{ bottom }}
        />
      );
    }
  };

  return (
    <CustomCarousel
      carouselProps={{
        ref: carouselRef,
        onIndexChanged: ({ index, total }): void =>
          handleOnIndexChanged(index, total),
        renderDots: ({ index, total }) => handleRenderDots(index, total),
      }}
    >
      {onboardingItems.map((item, index) => (
        <OnboardingSliderItem key={index} item={item} />
      ))}
    </CustomCarousel>
  );
};

export default OnboardingSlider;
