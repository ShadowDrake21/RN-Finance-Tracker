import { Image, Pressable, Text, Touchable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getFinanceById } from '@/supabase/supabase.requests';
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
import { Pie, PolarChart } from 'victory-native';

const Page = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { id } = useLocalSearchParams();

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

      setLoading(false);
    };

    fetchFinance();
  }, []);

  function randomNumber() {
    return Math.floor(Math.random() * 26) + 125;
  }
  function generateRandomColor(): string {
    // Generating a random number between 0 and 0xFFFFFF
    const randomColor = Math.floor(Math.random() * 0xffffff);
    // Converting the number to a hexadecimal string and padding with zeros
    return `#${randomColor.toString(16).padStart(6, '0')}`;
  }
  const DATA = (numberPoints = 5) =>
    Array.from({ length: numberPoints }, (_, index) => ({
      value: randomNumber(),
      color: generateRandomColor(),
      label: `Label ${index + 1}`,
    }));

  return (
    <>
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
            data={DATA} // 👈 specify your data
            labelKey={'label'} // 👈 specify data key for labels
            valueKey={'value'} // 👈 specify data key for values
            colorKey={'color'} // 👈 specify data key for color
          >
            <Pie.Chart />
          </PolarChart>
        </View>
      ) : (
        // <Text>{JSON.stringify(finance)}</Text>
        <Text>Unexpected error!</Text>
      )}
    </>
  );
};

export default Page;

// const styles = StyleSheet.create({
//   cos:{dd}
// });
