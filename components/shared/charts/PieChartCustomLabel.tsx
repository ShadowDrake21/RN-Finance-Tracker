import React from 'react';
import { PieSliceData } from 'victory-native';
import inter from 'assets/inter-medium.ttf';
import {
  Group,
  Text as SkText,
  SkFont,
  useFont,
} from '@shopify/react-native-skia';

export const PieChartCustomLabel = ({
  slice,
  position,
}: {
  slice: PieSliceData;

  position: { x: number; y: number };
}) => {
  const font = useFont(inter, 10);
  const { x, y } = position;
  const label = slice.label || 'No Label';
  const value = slice.value ? `${slice.value} UNITS` : 'No Value';

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
