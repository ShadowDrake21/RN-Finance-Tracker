import { useEffect } from 'react';
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PulseAnimationProps {
  duration?: { first: number; second: number };
  scaleValues?: { start: number; end: number };
}

const usePulseAnimation = ({
  duration = { first: 200, second: 200 },
  scaleValues = { start: 1, end: 1.2 },
}: PulseAnimationProps) => {
  const scaleValue = useSharedValue(1);

  const executePulseAnimation = () => {
    scaleValue.value = withRepeat(
      withSequence(
        withTiming(scaleValues.start, { duration: duration.first }),
        withTiming(scaleValues.end, { duration: duration.second })
      ),
      -1,
      true
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  return { executePulseAnimation, animatedStyle };
};

export default usePulseAnimation;
