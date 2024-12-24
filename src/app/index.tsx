import {
  AccessibilityInfo,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import LottieView from 'lottie-react-native';
import animation1 from '@/assets/animations/onboarding/Animation-1.lottie';
import animation2 from '@/assets/animations/onboarding/Animation-2.lottie';
import animation3 from '@/assets/animations/onboarding/Animation-3.lottie';
import Carousel, { defaultStyles } from 'pinar';

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

//https://github.com/meliorence/react-native-snap-carousel/blob/master/doc/PAGINATION.md#usage

const Page = () => {
  const router = useRouter();
  let carousel: Carousel | null = null;
  const { bottom } = useSafeAreaInsets();
  const [isLastItem, setIsLastItem] = useState(false);

  const skipToAuth = () => {
    router.replace('(auth)/sign-in');
  };

  // return (
  //   <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.main }}>
  //     <Carousel
  //       contentContainerStyle={{ backgroundColor: COLORS.main }}
  //       renderNext={({ scrollToNext }): JSX.Element => (
  //         <TouchableOpacity
  //           accessibilityRole="button"
  //           onPress={scrollToNext}
  //           testID="custom-next"
  //           style={{ position: 'absolute', bottom: 35, right: 50 }}
  //         >
  //           <Text style={styles.buttonText}>Next</Text>
  //         </TouchableOpacity>
  //       )}
  //       renderControls={}
  //       renderPrev={({ scrollToPrev }): JSX.Element => (
  //         <TouchableOpacity
  //           accessibilityRole="button"
  //           onPress={skipToAuth}
  //           testID="custom-prev"
  //           style={{ position: 'absolute', bottom: 35, left: 50 }}
  //         >
  //           <Text style={styles.buttonText}>Prev</Text>
  //         </TouchableOpacity>
  //       )}
  //       dotsContainerStyle={{
  //         position: 'absolute',
  //         bottom: 35,
  //         left: 0,
  //         right: 0,
  //         display: 'flex',
  //         flexDirection: 'row',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         gap: 20,
  //       }}
  //       activeDotStyle={{
  //         backgroundColor: '#00b77a',
  //         width: 13,
  //         height: 13,
  //         borderRadius: 50,
  //       }}
  //       dotStyle={{
  //         backgroundColor: 'rgba(0, 0, 0, 0.1)',
  //         width: 13,
  //         height: 13,
  //         borderRadius: 50,
  //       }}
  //       controlsTextStyle={{ fontSize: 50, color: '#eace15' }}
  //     >
  //       <View style={styles.slide1}>
  //         <Text style={styles.text}>1</Text>
  //       </View>
  //       <View style={styles.slide2}>
  //         <Text style={styles.text}>2</Text>
  //       </View>
  //       <View style={styles.slide3}>
  //         <Text style={styles.text}>3</Text>
  //       </View>
  //     </Carousel>
  //   </SafeAreaView>
  // );

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Carousel
        ref={(carouselRef): void => {
          carousel = carouselRef;
        }}
        showsControls={false}
        onIndexChanged={({ index, total }): void => {
          const page = index + 1;
          if (page === total && !isLastItem) {
            setIsLastItem(true);
          } else {
            setIsLastItem(false);
          }
        }}
        renderDots={({ index, total }) => {
          if (isLastItem) {
            return (
              <TouchableOpacity
                onPress={skipToAuth}
                style={{
                  position: 'relative',
                  bottom: bottom,
                  alignSelf: 'center',
                }}
              >
                <Text style={styles.controlBtn}>Get Started!</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <View style={[styles.dotsContainer, { bottom: bottom }]}>
                {Array.from({ length: total }).map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[
                      dotIndex === index
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
            );
          }
        }}
      >
        {onboardingItems.map((item, index) => (
          <View key={index} style={styles.item}>
            <LottieView
              source={item.animationPath}
              autoPlay
              loop
              style={{ width: 400, height: 400 }}
            />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        ))}
      </Carousel>
      <View style={[styles.controlsContainer, { bottom: bottom }]}>
        <TouchableOpacity
          onPress={() => carousel && carousel.scrollToPrev()}
          style={isLastItem ? { opacity: 0 } : {}}
        >
          <Text style={styles.controlBtn}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => carousel && carousel.scrollToNext()}
          style={isLastItem ? { opacity: 0 } : {}}
        >
          <Text style={[styles.controlBtn, { color: COLORS.primary }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 20,
  },
  itemDescription: {
    fontSize: 16,
    color: 'rgba(0,0,0, 0.5)',
    textAlign: 'center',
    marginTop: 10,
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
