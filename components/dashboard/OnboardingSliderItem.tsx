import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { OnboardingItem } from '@/types/types';
import { COLORS } from '@/constants/colors';

const OnboardingSliderItem = ({ item }: { item: OnboardingItem }) => {
  return (
    <View style={styles.item}>
      <LottieView
        source={item.animationPath}
        autoPlay
        loop
        style={{ width: 400, height: 400 }}
      />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );
};

export default OnboardingSliderItem;

const styles = StyleSheet.create({
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
});
