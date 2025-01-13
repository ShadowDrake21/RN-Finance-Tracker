import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { Stack } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import CustomCarousel from '@/components/shared/CustomCarousel';
import Carousel from 'pinar';
import CustomCarouselDots from '@/components/shared/customCarousel/CustomCarouselDots';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategoriesCarouselItem from '@/components/categories/carousel/CategoriesCarouselItem';
import { expensesItems } from '@/static/expenses.static';
import { incomeItems } from '@/static/income.static';
import CategoriesCarousel from '@/components/categories/carousel/CategoriesCarousel';

const Page = () => {
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: 'My categories',
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
        }}
      />
      <View
        style={{
          paddingTop: headerHeight + 10,
          paddingBottom: bottom + 30,
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <CategoriesCarousel bottom={bottom} />
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({});
