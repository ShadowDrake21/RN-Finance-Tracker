import { Pressable, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

export const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
