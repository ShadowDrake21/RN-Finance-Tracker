import { View } from 'react-native';
import React from 'react';
import Loader from '../shared/Loader';

const FinanceLoading = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Loader />
    </View>
  );
};

export default FinanceLoading;
