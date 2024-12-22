import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Tabs, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import MainHeader from '@/components/MainHeader';
import MonthScrollList from '@/components/MonthScrollList';
import { formatCurrency } from 'react-native-format-currency';
import { COLORS } from '@/constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import MoneyDashboardInfo from '@/components/MoneyDashboardInfo';
import { dummyBalanceData } from '@/dummy/dummy-balance-data';
import { compareDashboardDates } from '@/utils/date.utils';
import { dummyMonthData } from '@/dummy/dummy-month-data';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import DashboardActivityItem from '@/components/DashboardActivityItem';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { financeTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

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
  // const [visibleData, setVisibleData] = useState<IDayBalance[]>([]);
  const [page, setPage] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<
    (typeof financeTable.$inferSelect)[] | null
  >(null);

  useEffect(() => {
    const [valueFormattedWithSymbol] = formatCurrency({
      amount: rawCurrentBalance,
      code: 'PLN',
    });
    setFormattedCurrentBalance(valueFormattedWithSymbol);

    console.log('selected month', selectedMonthId);
  }, [rawCurrentBalance, selectedMonthId]);

  useEffect(() => {
    // setVisibleData([]);
    setPage(0);
    setLastIndex(0);
    console.warn(
      'resetting data',
      new Date('2024-4-28').getMonth(),
      new Date('2024-12-28').getFullYear()
    );
  }, [selectedMonthId]);

  // const filterData = () => {
  //   console.log('filtering data');

  //   console.log('lastIndex', lastIndex);

  //   for (let i = lastIndex; i < dummyBalanceData.length; i++) {
  //     console.log(
  //       'comparing',
  //       selectedMonthId,
  //       dummyBalanceData[i].date,
  //       compareDashboardDates(selectedMonthId, dummyBalanceData[i].date)
  //     );

  //     if (compareDashboardDates(selectedMonthId, dummyBalanceData[i].date)) {
  //       filtered.push(dummyBalanceData[i]);
  //       if (filtered.length === 5) {
  //         console.log('lastIndex', i + 1);
  //         setLastIndex(i + 1);
  //         break;
  //       }

  //       if (i === dummyBalanceData.length - 1) {
  //         setLastIndex(i + 1);
  //       }
  //     }
  //   }

  //   setVisibleData((prevData) => [...prevData, ...filtered]);
  // };

  // useEffect(() => {
  //   filterData();
  // }, [selectedMonthId, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!success) return;
    (async () => {
      const finances = await db
        .select()
        .from(financeTable)
        .where(
          eq(
            sql`strftime('%Y-%m', ${financeTable.date})`,
            selectedMonthId.split('-').reverse().join('-')
          )
        );
      setItems(finances);
      console.warn(
        'finances',
        finances,
        selectedMonthId.split('-').reverse().join('-')
      );
    })();
  }, [success, selectedMonthId]);
  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }
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
                {/* <FlatList
                  data={[visibleData]}
                  style={{ width: '100%' }}
                  initialNumToRender={2}
                  maxToRenderPerBatch={5}
                  keyExtractor={(item) => item.date.toString()}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item }) => <DashboardActivityItem {...item} />}
                /> */}
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
