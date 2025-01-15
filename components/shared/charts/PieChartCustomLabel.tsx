import React from 'react';
import { PieSliceData } from 'victory-native';
import inter from 'assets/inter-medium.ttf';
import { Group, Text as SkText, useFont } from '@shopify/react-native-skia';

export const PieChartCustomLabel = ({
  slice,
  position,
  currency,
  isValueVisible = true,
  noValueLabel = 'No Value',
}: {
  slice: PieSliceData;
  position: { x: number; y: number };
  currency: string;
  isValueVisible?: boolean;
  noValueLabel?: string;
}) => {
  const font = useFont(inter, 10);
  const { x, y } = position;
  const label = slice.label || 'No Label';
  const value =
    slice.value && isValueVisible
      ? `${slice.value.toFixed(2)} ${currency}`
      : noValueLabel;

  if (!font) return null;
  const fontSize = font.getSize() ?? 0;
  const labelWidth = font
    .getGlyphWidths(font.getGlyphIDs(label))
    .reduce((sum, value) => sum + value, 0);

  return (
    <Group>
      <SkText
        x={x - labelWidth / 2}
        y={y}
        text={label}
        font={font}
        color={'white'}
      />
      <SkText
        x={x - labelWidth / 2}
        y={y + fontSize}
        text={value}
        font={font}
        color={'limegreen'}
      />
    </Group>
  );
};
