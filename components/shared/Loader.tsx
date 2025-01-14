import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

const Loader = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return (
    <View
      style={[
        { flex: 1, alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default Loader;
