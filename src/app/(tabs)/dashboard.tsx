import {
  Animated,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import MainHeader from '@/components/MainHeader';
import MonthScrollList from '@/components/MonthScrollList';
import { formatCurrency } from 'react-native-format-currency';
import LinearGradient from 'react-native-linear-gradient';
import MoneyDashboardInfo from '@/components/MoneyDashboardInfo';
import { dummyMonthData } from '@/dummy/dummy-month-data';
import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import FinanceItem from '@/components/FinanceItem';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { financeTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { IFinanceGroup } from '@/types';
import { uniqueGroups } from '@/utils/finance-groups.utils';
import { useFetchFinances } from '@/hooks/fetch-finances.hook';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Page = () => {
  const flatListRef = useRef<FlatList<IFinanceGroup>>(null);
  const { top } = useSafeAreaInsets();
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
              snapPoints={[575, '85%']}
              index={0}
              handleStyle={{ paddingTop: 10, paddingBottom: 0 }}
              containerStyle={{ paddingBottom: 75 }}
              style={styles.container}
            >
              <BottomSheetView style={styles.contentContainer}>
                <FlatList
                  data={groups}
                  style={{ width: '100%', height: '100%' }}
                  contentContainerStyle={{
                    gap: 10,
                    paddingBottom: 75,
                  }}
                  initialNumToRender={5}
                  maxToRenderPerBatch={5}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.date}
                  onEndReached={() => {
                    handleLoadMore();
                    bottomSheetRef.current?.expand();
                  }}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item }) => <FinanceItem {...item} />}
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
