import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import LottieView from 'lottie-react-native';
import animation1 from '@/assets/animations/onboarding/Animation-1.lottie';
import animation2 from '@/assets/animations/onboarding/Animation-2.lottie';
import animation3 from '@/assets/animations/onboarding/Animation-3.lottie';

type OnboardingItem = {
  animationPath: string;
  title: string;
  description: string;
};

const onboardingItems: OnboardingItem[] = [
  {
    animationPath: animation1,
    title: 'Track Your Spending',
    description:
      'Easily monitor and categorize your daily expenses to stay on top of your budget.',
  },
  {
    animationPath: animation2,
    title: 'Set Your Financial Goals',
    description:
      'Create goals for savings, investments, and more, and track your progress over time.',
  },
  {
    animationPath: animation3,
    title: 'Smart Reports & Insights',
    description:
      'Get personalized insights and reports to understand where your money is going and optimize your spending.',
  },
];

const Page = () => {
  const router = useRouter();
  //   _renderItem = ({item, index}) => {
  //     return (
  //         <View style={styles.slide}>
  //             <Text style={styles.title}>{ item.title }</Text>
  //         </View>
  //     );
  // }

  // render () {
  //     return (
  //         <Carousel
  //           ref={(c) => { this._carousel = c; }}
  //           data={this.state.entries}
  //           renderItem={this._renderItem}
  //           sliderWidth={sliderWidth}
  //           itemWidth={itemWidth}
  //         />
  //     );
  // }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.main }}
    ></SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({});
