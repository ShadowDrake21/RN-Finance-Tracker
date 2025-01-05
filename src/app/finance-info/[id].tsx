import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  getFinanceById,
  getFinanceSumByDay,
} from '@/supabase/supabase.requests';
import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-react';
import { transformFinancesFromDB } from '@/utils/finance-groups.utils';
import { Finances, PieChartData } from '@/types/types';
import CustomActivityIndicator from '@/components/ui/CustomActivityIndicator';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { getIconPathParts } from '@/utils/helpers.utils';
import { format } from 'date-fns';
import { downloadImage } from '@/supabase/supabase.storage';
import ImageView from 'react-native-image-viewing';
import { Pie, PolarChart } from 'victory-native';

import { useFont } from '@shopify/react-native-skia';
import CustomPolarChart from '@/components/shared/CustomPolarChart';
import FinanceItemText from '@/components/finance-info/FinanceItemText';

function generateRandomColor(): string {
  const randomColor = Math.floor(Math.random() * 0xffffff);

  return `#${randomColor.toString(16).padStart(6, '0')}`;
}

const Page = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { id } = useLocalSearchParams();

  const [data, setData] = useState<PieChartData[]>([]);
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

      const chartData = [
        {
          value: typeFinances - Math.abs(transformedFinance.price),
          color: generateRandomColor(),
          label: 'Other',
        },
        {
          value: Math.abs(transformedFinance.price),
          color: generateRandomColor(),
          label: transformedFinance.name,
        },
      ];
      setData(chartData);

      setLoading(false);
    };

    fetchFinance();
  }, [id, user, getToken]);

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
          <FinanceItemText finance={finance} />
          {finance.image && (
            <View>
              <Text style={styles.attachedImage}>Attached image</Text>
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
          <CustomPolarChart data={data} />
        </View>
      ) : (
        <Text>Unexpected error!</Text>
      )}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 15,
  },
  topImage: {
    width: 100,
    height: 100,
    flexShrink: 0,
    alignSelf: 'flex-end',
  },
  topTextContainer: { flexShrink: 1, flex: 1 },
  topTextPrice: {
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'flex-end',
    paddingBottom: 20,
  },
  topTextItem: { textTransform: 'capitalize', fontSize: 16 },
  attachedImage: { fontSize: 18, fontWeight: '700', paddingBottom: 10 },
});
