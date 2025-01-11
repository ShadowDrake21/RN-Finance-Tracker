import { StyleSheet, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';

const GeneralBottomSheetView = ({ children }: PropsWithChildren) => {
  return (
    <BottomSheetView
      style={[styles.contentContainer, StyleSheet.absoluteFillObject]}
    >
      <View style={{ flex: 1, width: '100%' }}>{children}</View>
    </BottomSheetView>
  );
};

export default GeneralBottomSheetView;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
});
