import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  getFinanceById,
  getFinanceSumByDay,
  getFinanceSumByMonth,
} from '@/supabase/supabase.requests';
import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-react';
import { transformFinancesFromDB } from '@/utils/finance-groups.utils';
import { Finances, PieChartData } from '@/types/types';
import CustomActivityIndicator from '@/components/ui/CustomActivityIndicator';
import { downloadImage } from '@/supabase/supabase.storage';

import CustomPolarChart from '@/components/shared/CustomPolarChart';
import FinanceItemText from '@/components/finance-info/FinanceItemText';
import { formPieChartData } from '@/utils/charts.utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FinanceImage from '@/components/shared/FinanceImage';
import Loader from '@/components/shared/Loader';

const Page = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { id } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();

  const [dayData, setDayData] = useState<PieChartData[]>([]);
  const [monthData, setMonthData] = useState<PieChartData[]>([]);
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

    setDayData(
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
          currency: transformedFinance.currency.label,
        },
      })
    );

    setMonthData(
      formPieChartData({
        fullPrice: await getFinanceSumByMonth({
          type: transformedFinance.type,
          selectedMonthId: `${
            new Date(transformedFinance.date).getMonth() + 1
          }-${new Date(transformedFinance.date).getFullYear()}`,
          token,
          userId: user.id,
        }),
        finance: {
          name: transformedFinance.name,
          price: transformedFinance.price,
          currency: transformedFinance.currency.label,
        },
      })
    );

    setLoading(false);
  }, [id, user, getToken]);

  useEffect(() => {
    fetchFinance();
  }, [fetchFinance]);

  return (
    <View style={{ flex: 1, paddingBottom: bottom + 40 }}>
      {loading ? (
        <Loader />
      ) : finance ? (
        <>
          <Stack.Screen
            options={{
              title: finance?.name ?? 'Loading...',
            }}
          />
          <ScrollView style={{ padding: 20, flex: 1 }}>
            <FinanceItemText finance={finance} />
            {finance.image && <FinanceImage image={finance.image} />}

            <View style={{ paddingVertical: 25, gap: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    textAlign: 'center',
                    paddingBottom: 10,
                  }}
                >
                  Finance activity to all {finance.type.toLowerCase()}s on this
                  day
                </Text>
                <CustomPolarChart data={dayData} />
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    textAlign: 'center',
                    paddingBottom: 10,
                  }}
                >
                  Finance activity to all {finance.type.toLowerCase()}s in{' '}
                  {new Date(finance.date).toLocaleString('default', {
                    month: 'long',
                  })}
                </Text>
                <CustomPolarChart data={monthData} />
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <Text>Unexpected error!</Text>
      )}
    </View>
  );
};

export default Page;
