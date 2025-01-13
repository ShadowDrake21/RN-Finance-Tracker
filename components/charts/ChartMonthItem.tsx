import { Text, View } from 'react-native';
import React from 'react';

const ChartMonthItem = ({ monthId }: { monthId: string }) => {
  return (
    <View>
      <Text>{monthId}</Text>
    </View>
  );
};

export default ChartMonthItem;
