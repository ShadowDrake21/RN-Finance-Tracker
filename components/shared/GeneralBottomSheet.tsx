import { StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { GeneralBottomSheetProps } from '@/types/types';

const GeneralBottomSheet = ({
  children,
  bottomSheetRef,
  snapPoints = ['87%'],
  containerStyle = {},
  pointIndex = 1,
}: PropsWithChildren & GeneralBottomSheetProps) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={pointIndex}
      handleStyle={{ paddingTop: 10, paddingBottom: 0 }}
      containerStyle={containerStyle}
      style={styles.container}
      enableDynamicSizing={false}
    >
      {children}
    </BottomSheet>
  );
};

export default GeneralBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
});
