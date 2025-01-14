import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategoriesCarousel from '@/components/categories/carousel/CategoriesCarousel';
import { customCapitalize } from '@/utils/helpers.utils';
import { Finances, IFinanceGroup } from '@/types/types';
import { getFinancesByType } from '@/supabase/supabase.requests';
import { useAuth } from '@clerk/clerk-expo';
import {
  groupFinancesByDate,
  transformFinancesFromDB,
} from '@/utils/finance-groups.utils';
import CategoriesBottomSheet from '@/components/categories/bottomSheet/CategoriesBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Page = () => {
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();
  const { category } = useLocalSearchParams<{ category: string }>();
  const [categoryName, typeName] = category.split('-');

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: `${customCapitalize(typeName)}: ${customCapitalize(
            typeName
          )}`,
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
        <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
          <CategoriesBottomSheet category={`${categoryName}/${typeName}`} />
        </GestureHandlerRootView>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({});
