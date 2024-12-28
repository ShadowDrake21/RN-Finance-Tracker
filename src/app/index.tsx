import { StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Redirect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import Carousel from 'pinar';
import { useAuth } from '@clerk/clerk-expo';
import CustomActivityIndicator from '@/components/ui/CustomActivityIndicator';
import OnboardingSlider from '@/components/onboarding/OnboardingSlider';
import OnboardingButtons from '@/components/onboarding/OnboardingButtons';

const Page = () => {
  const carouselRef = useRef<Carousel | null>(null);
  const { bottom } = useSafeAreaInsets();
  const [isLastItem, setIsLastItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CustomActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <OnboardingSlider
        carouselRef={carouselRef}
        isLastItem={isLastItem}
        setIsLastItem={setIsLastItem}
        setIsLoading={setIsLoading}
      />
      <OnboardingButtons carouselRef={carouselRef} isLastItem={isLastItem} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
});
