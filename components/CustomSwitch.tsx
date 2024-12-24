import SwitchSelector from 'react-native-switch-selector';

// const options = [
//   { label: "01:00", value: "1" },
//   { label: "01:30", value: "1.5" },
//   { label: "02:00", value: "2" }
// ];

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SwitchItemType } from '@/types/types';

const CustomSwitch = ({
  options,
  setValue,
}: {
  options: SwitchItemType[];
  setValue: (a: boolean) => void;
}) => {
  return (
    <SwitchSelector
      options={options}
      initial={0}
      onPress={(value) => setValue(value === 'week')}
    />
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({});
