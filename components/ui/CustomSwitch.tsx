import { Switch } from 'react-native-switch';

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import { SwitchItemType } from '@/types/types';
import { COLORS } from '@/constants/colors';
import { SwitchItemProps } from '@/types/types';

const CustomSwitch = ({
  value,
  onPress,
  props,
}: {
  value: boolean;
  onPress: () => void;
  props?: Partial<SwitchItemProps>;
}) => {
  return (
    <Switch
      value={value}
      onValueChange={onPress}
      disabled={false}
      activeText={'On'}
      inActiveText={'Off'}
      circleSize={30}
      barHeight={30}
      circleBorderWidth={1}
      backgroundActive={'green'}
      backgroundInactive={'gray'}
      circleActiveColor={COLORS.primary}
      circleInActiveColor={COLORS.darkGray}
      {...props}
      changeValueImmediately={true}
      innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }}
      outerCircleStyle={{}}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={2}
      switchRightPx={2}
      switchWidthMultiplier={2}
      switchBorderRadius={30}
    />
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({});
