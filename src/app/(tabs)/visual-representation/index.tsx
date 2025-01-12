import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import ChartsBottomSheet from '@/components/charts/ChartsBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChartsItem from '@/components/charts/ChartsItem';

const Page = () => {
  const { user } = useUser();
  const [years, setYears] = useState<number[]>([]);

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const allYears = getYearsBetween();

    setYears(allYears);
  }, [user]);

  const getYearsBetween = () => {
    if (!user?.createdAt) return [];

    let years = [];
    const dateNow = new Date().getFullYear();
    const dateCreated = new Date(user.createdAt).getFullYear();

    for (let i = dateCreated; i <= dateNow; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: `Your charts (${Math.min(...years)}-${Math.max(
            ...years
          )})`,
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
        }}
      />
      <View
        style={[
          { paddingTop: headerHeight + 10, flex: 1, paddingHorizontal: 20 },
        ]}
      >
        {/* <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
          <ChartsBottomSheet />
        </GestureHandlerRootView> */}
        <View style={{ flex: 1, gap: 20 }}>
          {years.map((year) => (
            <ChartsItem key={year} year={year} />
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({});
