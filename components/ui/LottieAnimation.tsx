import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LottieAnimation = ({
  localPath,
  speed = 0.5,
  style = { width: 200, height: 200 },
}: {
  localPath: string;
  speed?: number;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <LottieView
      source={{ uri: localPath }}
      autoPlay
      loop
      speed={speed}
      style={style}
    />
  );
};

export default LottieAnimation;

const styles = StyleSheet.create({});
