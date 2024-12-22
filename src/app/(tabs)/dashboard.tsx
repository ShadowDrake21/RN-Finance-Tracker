import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import MainHeader from '@/components/MainHeader';
import MonthScrollList from '@/components/MonthScrollList';
import { formatCurrency } from 'react-native-format-currency';
import LinearGradient from 'react-native-linear-gradient';
import MoneyDashboardInfo from '@/components/MoneyDashboardInfo';
import { dummyMonthData } from '@/dummy/dummy-month-data';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import DashboardActivityItem from '@/components/DashboardActivityItem';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { financeTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { IFinanceGroup } from '@/types';
import uuid from 'react-native-uuid';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

const Page = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [wallet, setWallet] = useState('Wallet 1');
  const [selectedMonthId, setSelectedMonthId] = useState('12-2024');
  const [rawCurrentBalance, setRawCurrentBalance] = useState(13456.56);
  const [formattedCurrentBalance, setFormattedCurrentBalance] = useState('');
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<
    (typeof financeTable.$inferSelect)[] | null
  >(null);

  const [groups, setGroups] = useState<IFinanceGroup[]>([]);

  useEffect(() => {
    const [valueFormattedWithSymbol] = formatCurrency({
      amount: rawCurrentBalance,
      code: 'PLN',
    });
    setFormattedCurrentBalance(valueFormattedWithSymbol);

    console.log('selected month', selectedMonthId);
  }, [rawCurrentBalance, selectedMonthId]);

  useEffect(() => {
    setPage(0);
    setGroups([]);
    fetchFinances();
    console.warn('resetting data');
  }, [selectedMonthId]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchFinances();
  };

  const groupFinancesByDate = (
    finances: (typeof financeTable.$inferSelect)[]
  ): IFinanceGroup[] => {
    console.log('groupFinancesByDate', finances);

    const grouped = finances.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const key = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      if (!acc[key]) {
        acc[key] = {
          date: key,
          total: 0,
          items: [],
        };
      }
      acc[key].total += curr.price;
      acc[key].items.push({
        id: curr.id,
        name: curr.name,
        description: curr.description!,
        price: curr.price,
        iconType: curr.iconType,
      });
      return acc;
    }, {} as Record<string, IFinanceGroup>);

    return Object.values(grouped);
  };

  const fetchFinances = async () => {
    console.log('set groups', page, selectedMonthId);

    const finances = await db
      .select()
      .from(financeTable)
      .where(
        eq(
          sql`strftime('%Y-%m', ${financeTable.date})`,
          selectedMonthId.split('-').reverse().join('-')
        )
      )
      .offset(page * 10)
      .limit(10);
    setItems(finances);

    setGroups((existingGroups) => [
      ...existingGroups,
      ...groupFinancesByDate(finances),
    ]);
    console.warn('group', groups);
  };

  useEffect(() => {}, [selectedMonthId, page]);

  if (items === null || items.length === 0) {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        blurRadius={10}
        source={require('@/assets/images/dashboard-bg.png')}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.6)', 'rgba(0,0,0,0.4)']}
          style={{ flex: 1 }}
        >
          <Tabs.Screen
            options={{
              headerTransparent: true,
              headerTintColor: '#210e1b',
              header: ({ options: { headerTintColor } }) => (
                <MainHeader
                  headerTintColor={headerTintColor}
                  top={top}
                  wallet={wallet}
                  setWallet={setWallet}
                />
              ),
            }}
          />
          <View style={{ paddingTop: headerHeight }}>
            <MonthScrollList
              data={dummyMonthData}
              selectedId={selectedMonthId}
              setSelectedId={setSelectedMonthId}
            />
          </View>
          <MoneyDashboardInfo
            selectedMonthId={selectedMonthId}
            formattedCurrentBalance={formattedCurrentBalance}
          />

          <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={[600, '85%']}
              index={1}
              handleComponent={null}
            >
              <BottomSheetView style={styles.contentContainer}>
                <FlatList
                  data={groups}
                  style={{ width: '100%' }}
                  initialNumToRender={2}
                  maxToRenderPerBatch={5}
                  keyExtractor={() => uuid.v4()}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item }) => <DashboardActivityItem {...item} />}
                />
                <Text>Hi!</Text>
              </BottomSheetView>
            </BottomSheet>
          </GestureHandlerRootView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
});
