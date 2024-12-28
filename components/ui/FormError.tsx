import { Text } from 'react-native';
import React from 'react';

const FormError = ({ children }: { children: string }) => {
  return <Text style={{ color: 'red' }}>{children}</Text>;
};

export default FormError;
