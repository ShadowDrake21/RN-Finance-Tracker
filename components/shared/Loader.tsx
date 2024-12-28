import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default Loader;
