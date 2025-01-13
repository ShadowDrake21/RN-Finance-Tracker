import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React, { PropsWithChildren, RefObject } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

type GeneralBottomSheetProps = {
  bottomSheetRef: RefObject<BottomSheet>;
  snapPoints?: (number | string)[];
  containerStyle?: StyleProp<ViewStyle>;
  pointIndex?: number;
};

const GeneralBottomSheet = ({
  children,
  bottomSheetRef,
  snapPoints = ['60%', '85%'],
  containerStyle = {},
  pointIndex = 1,
}: PropsWithChildren & GeneralBottomSheetProps) => {
  console.log('pointIndex', pointIndex);

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
