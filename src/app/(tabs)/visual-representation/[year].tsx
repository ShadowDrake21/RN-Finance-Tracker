import { StyleSheet, View } from 'react-native';
import React from 'react';
import ChartsBottomSheet from '@/components/charts/ChartsBottomSheet';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { Stack, useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useHeaderHeight } from '@react-navigation/elements';

const Page = () => {
  const { year } = useLocalSearchParams<{ year: string }>();
  const headerHeight = useHeaderHeight();

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: `Your charts for ${year}`,
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
        }}
      />
      <View style={[{ paddingTop: headerHeight + 10, flex: 1 }]}>
        <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
          <ChartsBottomSheet year={+year} />
        </GestureHandlerRootView>
      </View>
    </ScreenWrapper>
  );
};

export default Page;
