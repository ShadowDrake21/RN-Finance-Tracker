import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import FinanceItemText from '@/components/finance-info/FinanceItemText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FinanceImage from '@/components/shared/FinanceImage';
import Loader from '@/components/shared/Loader';
import useFetchFinanceById from '@/hooks/useFetchFinanceById';
import usePieChartData from '@/hooks/usePieChartData';
import FinanceItemChart from '@/components/finance-info/FinanceItemChart';
import FinanceItemError from '@/components/finance-info/FinanceItemError';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bottom } = useSafeAreaInsets();

  const { finance, loading } = useFetchFinanceById(id);
  const { dayData, monthData } = usePieChartData(finance);

  return (
    <View style={{ flex: 1, paddingBottom: bottom + 20 }}>
      <Stack.Screen
        options={{
          title: finance?.name || 'Loading...',
        }}
      />
      {loading ? (
        <Loader />
      ) : finance ? (
        <>
          <ScrollView style={styles.scrollContainer}>
            <FinanceItemText finance={finance} />
            {finance.image && <FinanceImage image={finance.image} />}

            <View style={styles.containerWrapper}>
              <FinanceItemChart
                text={`Finance activity to all ${finance.type.toLowerCase()}s on this day`}
                data={dayData}
              />
              <FinanceItemChart
                text={`Finance activity to all ${finance.type.toLowerCase()}s in ${new Date(
                  finance.date
                ).toLocaleString('default', {
                  month: 'long',
                })}`}
                data={monthData}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <FinanceItemError />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  scrollContainer: { padding: 20, flex: 1 },
  containerWrapper: { paddingVertical: 25, gap: 20 },
});
