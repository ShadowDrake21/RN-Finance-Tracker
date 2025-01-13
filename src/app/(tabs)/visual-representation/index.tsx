import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { useHeaderHeight } from '@react-navigation/elements';
import ChartsItem from '@/components/charts/ChartsItem';
import { getYearsBetween } from '@/utils/helpers.utils';

const Page = () => {
  const { user } = useUser();
  const [years, setYears] = useState<number[]>([]);

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (!user?.createdAt) return;

    const recievedYears = getYearsBetween({
      start: user?.createdAt,
      end: new Date(),
    });
    setYears(recievedYears);
  }, [user]);

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: `My charts (${Math.min(...years)}-${Math.max(
            ...years
          )})`,
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
        }}
      />
      <View
        style={{
          paddingTop: headerHeight + 10,
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
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
