import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedTouchableOpacity } from '@/utils/animation.utils';
import { COLORS } from '@/constants/colors';

const SwipeableFinanceAction = ({
  type,
  drag,
  action,
}: {
  type: 'left' | 'right';
  drag: SharedValue<number>;
  action: () => Promise<void> | void;
}) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        type === 'right'
          ? { translateX: drag.value + 100 }
          : { translateX: drag.value - 100 },
      ],
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.swipeableAction,
        styleAnimation,
        { backgroundColor: type === 'right' ? 'red' : COLORS.primary },
      ]}
      onPress={() => {
        drag.value = withTiming(0);
        action();
      }}
    >
      <Text style={styles.swipeableActionText}>
        {type === 'left' ? 'Archive' : 'Delete'}
      </Text>
    </AnimatedTouchableOpacity>
  );
};

export default SwipeableFinanceAction;

const styles = StyleSheet.create({
  swipeableAction: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeableActionText: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
});
