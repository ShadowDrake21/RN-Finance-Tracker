import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

const OnboardingButton = ({
  btnProps,
  labelProps,
  children,
}: {
  btnProps: TouchableOpacityProps;
  labelProps: TextProps;
  children: React.ReactNode;
}) => (
  <TouchableOpacity {...btnProps}>
    <Text {...labelProps}>{children}</Text>
  </TouchableOpacity>
);

export default OnboardingButton;
