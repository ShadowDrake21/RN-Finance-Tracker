import { StyleSheet, Text } from 'react-native';
import React from 'react';

const ChartsBottomSheetListTitle = ({
  monthId,
  year,
}: {
  monthId: string;
  year: number;
}) => {
  const title = new Date(
    new Date().setFullYear(year, parseInt(monthId.split('-')[0]) - 1)
  ).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Text numberOfLines={1} style={styles.chartTitle}>
      {title}
    </Text>
  );
};

export default ChartsBottomSheetListTitle;

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
