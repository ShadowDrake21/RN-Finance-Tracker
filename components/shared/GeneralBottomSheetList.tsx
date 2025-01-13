import { StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren } from 'react';

const GeneralBottomSheetList = ({ children }: PropsWithChildren) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};

export default GeneralBottomSheetList;

const styles = StyleSheet.create({});
