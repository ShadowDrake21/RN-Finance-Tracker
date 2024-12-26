import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

const CustomActivityIndicator = ({
  size,
  color = COLORS.primary,
  style,
}: ActivityIndicatorProps) => {
  return <ActivityIndicator style={style} size={size} color={color} />;
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({});
