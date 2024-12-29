import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OnboardingSlider from '../../onboarding/OnboardingSlider';
import OnboardingSliderItem from '../../onboarding/OnboardingSliderItem';
import Carousel from 'pinar';
import { expensesItems } from '@/static/expenses.static';
import FinanceSliderList from './FinanceSliderList';
import { incomeItems } from '@/static/income.static';

const FinanceSlider = ({
  type,
}: // carouselRef,

// setIsLoading,
{
  type: 'expense' | 'income';
  // carouselRef: React.MutableRefObject<Carousel | null>;
  // setIsLoading: (a: boolean) => void;
}) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Carousel
      // ref={carouselRef}
      // showsControls={false}
      renderDots={({ index, total }) => {
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
      }}
    >
      {(type === 'expense' ? expensesItems : incomeItems).map((item, index) => (
        <FinanceSliderList key={index} category={item} />
      ))}
    </Carousel>
  );
};

export default FinanceSlider;

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
