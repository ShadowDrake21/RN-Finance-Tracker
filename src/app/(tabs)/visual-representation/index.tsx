import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

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
      <View style={[{ paddingTop: headerHeight + 10, flex: 1 }]}>
        <Text>something</Text>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({});
