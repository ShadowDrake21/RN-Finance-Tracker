import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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
import { downloadImage } from '@/supabase/supabase.storage';

import CustomPolarChart from '@/components/shared/CustomPolarChart';
import FinanceItemText from '@/components/finance-info/FinanceItemText';
import FinanceItemImage from '@/components/finance-info/FinanceItemImage';
import { formPieChartData } from '@/utils/charts.utils';

const Page = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { id } = useLocalSearchParams();

  const [data, setData] = useState<PieChartData[]>([]);
  const [finance, setFinance] = useState<Finances>();
  const [loading, setLoading] = useState(false);

  const fetchFinance = useCallback(async () => {
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

    const transformedFinance = transformFinancesFromDB(
      await getFinanceById({
        userId: user?.id,
        token: token,
        finance_id: isNaN(+id) ? 0 : +id,
      })
    )[0];

    const downloadedImageUrl = transformedFinance.image
      ? await downloadImage({
          user_id: user.id,
          token,
          imagePath: transformedFinance.image,
        })
      : null;

    setFinance({ ...transformedFinance, image: downloadedImageUrl });

    setData(
      formPieChartData({
        fullPrice: await getFinanceSumByDay({
          type: transformedFinance.type,
          selectedDate: transformedFinance.date,
          token,
          userId: user.id,
        }),
        finance: {
          name: transformedFinance.name,
          price: transformedFinance.price,
        },
      })
    );

    setLoading(false);
  }, [id, user, getToken]);

  useEffect(() => {
    fetchFinance();
  }, [fetchFinance]);

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
          {finance.image && <FinanceItemImage image={finance.image} />}
          <CustomPolarChart data={data} />
        </View>
      ) : (
        <Text>Unexpected error!</Text>
      )}
    </ScrollView>
  );
};

export default Page;
