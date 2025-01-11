import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { StyleProps } from 'react-native-reanimated';

const AnimatedMessage = ({
  animatedStyle,
  text,
}: {
  animatedStyle: StyleProps;
  text: string;
}) => {
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.Text>{text}</Animated.Text>
    </Animated.View>
  );
};

export default AnimatedMessage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
});
