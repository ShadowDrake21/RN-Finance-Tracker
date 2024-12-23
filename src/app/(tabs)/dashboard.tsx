import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
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
import { uniqueGroups } from '@/utils/finance-groups.utils';
import { useFetchFinances } from '@/hooks/fetch-finances.hook';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

const renderItem = ({ item }: { item: IFinanceGroup }) => {
  return <DashboardActivityItem {...item} />;
};

const Page = () => {
  const flatListRef = useRef<FlatList<IFinanceGroup>>(null);
  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [wallet, setWallet] = useState('Wallet 1');
  const [selectedMonthId, setSelectedMonthId] = useState('12-2024');
  const [rawCurrentBalance, setRawCurrentBalance] = useState(13456.56);
  const [formattedCurrentBalance, setFormattedCurrentBalance] = useState('');

  const { groups, handleLoadMore } = useFetchFinances(selectedMonthId);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [selectedMonthId]);

  useEffect(() => {
    const [valueFormattedWithSymbol] = formatCurrency({
      amount: rawCurrentBalance,
      code: 'PLN',
    });
    setFormattedCurrentBalance(valueFormattedWithSymbol);
  }, [rawCurrentBalance]);

  // if (items.length === 0) {
  //   return (
  //     <View>
  //       <Text>Empty</Text>
  //     </View>
  //   );
  // }

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
                  contentContainerStyle={{ paddingBottom: bottom + 200 }}
                  initialNumToRender={2}
                  maxToRenderPerBatch={5}
                  keyExtractor={(item) => item.date}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.3}
                  renderItem={renderItem}
                />
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
