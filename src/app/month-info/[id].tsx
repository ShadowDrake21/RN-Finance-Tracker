import {
  Image,
  Pressable,
  ScrollView,
  Text,
  Touchable,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  getFinanceById,
  getFinanceSumByDay,
} from '@/supabase/supabase.requests';
import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-react';
import { transformFinancesFromDB } from '@/utils/finance-groups.utils';
import { Finances } from '@/types/types';
import CustomActivityIndicator from '@/components/ui/CustomActivityIndicator';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { getIconPathParts } from '@/utils/helpers.utils';
import { format } from 'date-fns';
import { downloadImage } from '@/supabase/supabase.storage';
import ImageView from 'react-native-image-viewing';
import {
  getTransformComponents,
  Pie,
  PolarChart,
  setScale,
  setTranslate,
  useChartTransformState,
} from 'victory-native';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';
import { Group, Text as SkText, type SkFont } from '@shopify/react-native-skia';
import type { PieSliceData } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import inter from 'assets/inter-medium.ttf';

const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 125;
function generateRandomColor(): string {
  // Generating a random number between 0 and 0xFFFFFF
  const randomColor = Math.floor(Math.random() * 0xffffff);
  // Converting the number to a hexadecimal string and padding with zeros
  return `#${randomColor.toString(16).padStart(6, '0')}`;
}

const DATA = (numberPoints = 5) => {
  const res = Array.from({ length: numberPoints }, (_, index) => ({
    value: randomNumber(),
    color: generateRandomColor(),
    label: `Label ${index + 1}`,
  }));
  console.log('RES', res);

  return res;
};

const Page = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { id } = useLocalSearchParams();
  const font = useFont(inter, 10);

  const [data, setData] = useState<
    {
      value: number;
      color: string;
      label: string;
    }[]
  >([]);
  const [allTypeFinancesByDay, setAllTypeFinancesByDay] = useState(0);
  const [finance, setFinance] = useState<Finances>();
  const [iconParts, setIconParts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchFinance = async () => {
      setLoading(true);
      if (!user) {
        setLoading(false);
        return;
      }

      const token = await getToken({ template: 'supabase' });

      if (!token) {
        setLoading(false);
        return;
      }

      const fetchedFinance = await getFinanceById({
        userId: user?.id,
        token: token,
        finance_id: isNaN(+id) ? 0 : +id,
      });

      const transformedFinance = transformFinancesFromDB(fetchedFinance)[0];

      const downloadedImageUrl = transformedFinance.image
        ? await downloadImage({
            user_id: user.id,
            token,
            imagePath: transformedFinance.image,
          })
        : null;

      setFinance({ ...transformedFinance, image: downloadedImageUrl });

      setIconParts(getIconPathParts(transformedFinance.icon_type));

      const typeFinances = await getFinanceSumByDay({
        type: transformedFinance.type,
        selectedDate: transformedFinance.date,
        token: token,
        userId: user.id,
      });

      setAllTypeFinancesByDay(typeFinances);

      console.log('TYPE FINANCES', typeFinances);
      // const chartData = [
      //   {
      //     value: allTypeFinancesByDay,
      //     color: generateRandomColor(),
      //     label: 'Total',
      //   },
      //   {
      //     value: finance!.price,
      //     color: generateRandomColor(),
      //     label: finance!.name,
      //   },
      // ];

      // console.log('CHART DATA', chartData);

      // setData(chartData);
      setLoading(false);
    };

    fetchFinance();
  }, [id]);

  useCallback(() => {
    if (!finance) {
      console.log('NO FINANCE');
      return;
    }

    console.log('DATA', data);
  }, [finance, allTypeFinancesByDay]);

  const [dataLabelSegment, setDataLabelSegment] = useState<
    'simple' | 'custom' | 'none'
  >('none');

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: finance?.name ?? 'Loading...',
        }}
      />
      {loading ? (
        <CustomActivityIndicator size="large" />
      ) : finance ? (
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingBottom: 15,
            }}
          >
            <Image
              source={
                finance.type === 'expense'
                  ? EXPENSES_ICONS[iconParts[0]][iconParts[1]]
                  : INCOME_ICONS[iconParts[0]][iconParts[1]]
              }
              style={{
                width: 100,
                height: 100,
                flexShrink: 0,
                alignSelf: 'flex-end',
              }}
            />
            <View style={{ flexShrink: 1, flex: 1 }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  alignSelf: 'flex-end',
                  color: finance.type === 'expense' ? 'red' : 'green',
                  paddingBottom: 20,
                }}
              >
                {finance.price} {finance.currency.label}
              </Text>

              <Text
                ellipsizeMode="middle"
                style={{ textTransform: 'capitalize', fontSize: 16 }}
              >
                Name: <Text style={{ fontWeight: '700' }}>{finance.name}</Text>
              </Text>
              <Text style={{ textTransform: 'capitalize', fontSize: 16 }}>
                Type: <Text style={{ fontWeight: '700' }}>{finance.type}</Text>
              </Text>
              <Text style={{ textTransform: 'capitalize', fontSize: 16 }}>
                Subtype:{' '}
                <Text style={{ fontWeight: '700' }}>
                  {finance.icon_type.replace(/_/g, ' ').replace(/\//g, ' / ')}
                </Text>
              </Text>
              <Text style={{ textTransform: 'capitalize', fontSize: 16 }}>
                Date:{' '}
                <Text style={{ fontWeight: '700' }}>
                  {format(
                    new Date(finance.date).toISOString().split('T')[0],
                    'E, d MMMM yyyy'
                  )}
                </Text>
              </Text>
            </View>
          </View>
          {finance.image && (
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: '700', paddingBottom: 10 }}
              >
                Attached image
              </Text>
              <Pressable onPress={() => setIsVisible(true)}>
                <Image
                  source={{ uri: finance.image }}
                  style={{ width: '100%', aspectRatio: 1 }}
                />
              </Pressable>
              <ImageView
                images={[{ uri: finance.image }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                animationType="slide"
                presentationStyle="fullScreen"
              />
            </View>
          )}
          <PolarChart
            // transformState={state}
            data={data}
            colorKey={'color'}
            valueKey={'value'}
            labelKey={'label'}
            canvasStyle={{ width: 300, height: 300 }}
          >
            <Pie.Chart>
              {({ slice }) => {
                return (
                  <>
                    <Pie.Slice>
                      {dataLabelSegment === 'simple' && (
                        <Pie.Label color={'black'} />
                      )}
                      {dataLabelSegment === 'custom' && (
                        <Pie.Label radiusOffset={0.6}>
                          {(position) => (
                            <PieChartCustomLabel
                              position={position}
                              slice={slice}
                              font={font}
                            />
                          )}
                        </Pie.Label>
                      )}
                    </Pie.Slice>

                    {/* <Pie.SliceAngularInset
                      angularInset={{
                        angularStrokeWidth: insetWidth,
                        angularStrokeColor: insetColor,
                      }}
                    /> */}
                  </>
                );
              }}
            </Pie.Chart>
          </PolarChart>
        </View>
      ) : (
        // <Text>{JSON.stringify(finance)}</Text>
        <Text>Unexpected error!</Text>
      )}
    </ScrollView>
  );
};

export default Page;

// const styles = StyleSheet.create({
//   cos:{dd}
// });

export const PieChartCustomLabel = ({
  slice,
  font,
  position,
}: {
  slice: PieSliceData;
  font: SkFont | null;
  position: { x: number; y: number };
}) => {
  const { x, y } = position;
  const fontSize = font?.getSize() ?? 0;
  console.log('FONT SIZE', fontSize);

  const getLabelWidth = (text: string) =>
    font
      ?.getGlyphWidths(font.getGlyphIDs(text))
      .reduce((sum, value) => sum + value, 0) ?? 0;

  const isGoodUnits = slice.value > 130;
  const label = slice.label;
  const value = `${slice.value} UNITS`;
  const centerLabel = (font?.getSize() ?? 0) / 2;

  return (
    <Group transform={[{ translateY: -centerLabel }]}>
      <SkText
        x={x - getLabelWidth(label) / 2}
        y={y}
        text={label}
        font={font}
        color={'white'}
      />
      <Group>
        <SkText
          x={x - getLabelWidth(value) / 2}
          y={y + fontSize}
          text={value}
          font={font}
          color={isGoodUnits ? 'limegreen' : 'red'}
        />
      </Group>
    </Group>
  );
};
