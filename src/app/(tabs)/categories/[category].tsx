import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { customCapitalize } from '@/utils/helpers.utils';
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
          headerTitle: `${customCapitalize(categoryName)}: ${customCapitalize(
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
