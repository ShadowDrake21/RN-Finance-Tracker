import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import LottieView from 'lottie-react-native';
import Carousel from 'pinar';
import { useAuth } from '@clerk/clerk-expo';
import { onboardingItems } from '@/static/onboarding.static';

const Page = () => {
  const router = useRouter();
  let carousel: Carousel | null = null;
  const { bottom } = useSafeAreaInsets();
  const [isLastItem, setIsLastItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const skipToAuth = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.replace('(auth)/sign-in');
    }, 300);
  };

  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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
                <Text style={[styles.controlBtn, { color: COLORS.primary }]}>
                  Get Started!
                </Text>
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
          onPress={() => {
            if (carousel && !isLastItem) {
              carousel.scrollToIndex({
                index: onboardingItems.length - 1,
                animated: true,
              });
            }
          }}
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
    backgroundColor: COLORS.lightGray,
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
