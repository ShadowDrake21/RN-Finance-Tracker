import { StyleSheet, View } from 'react-native';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileBottomSheet from '@/components/profile/ProfileBottomSheet';
import ProfileHeaderButtons from '@/components/profile/ProfileHeaderButtons';

const Page = () => {
  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: 'My profile',
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
          headerRight: () => <ProfileHeaderButtons />,
        }}
      />
      <View style={styles.container}>
        <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
          <ProfileBottomSheet />
        </GestureHandlerRootView>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
