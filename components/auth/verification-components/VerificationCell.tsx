import { LayoutChangeEvent, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Cursor } from 'react-native-confirmation-code-field';
import { COLORS } from '@/constants/colors';

type VerificationCellProps = {
  index: number;
  isFocused: boolean;
  symbol: string;
  layoutHandler: (key: number) => (event: LayoutChangeEvent) => void;
};

const VerificationCell = ({
  index,
  isFocused,
  symbol,
  layoutHandler,
}: VerificationCellProps) => {
  return (
    <Text
      style={[styles.cell, isFocused && styles.focusCell]}
      onLayout={layoutHandler(index)}
    >
      {symbol || (isFocused ? <Cursor /> : null)}
    </Text>
  );
};

export default VerificationCell;

const styles = StyleSheet.create({
  cell: {
    width: 60,
    height: 60,
    lineHeight: 48,
    fontSize: 34,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.primary,
  },
});
