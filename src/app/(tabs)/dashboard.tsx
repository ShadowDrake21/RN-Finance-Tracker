import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import MainHeader from '@/components/shared/MainHeader';
import MonthScrollList from '@/components/dashboard/MonthScrollList';
import LinearGradient from 'react-native-linear-gradient';
import MoneyDashboardInfo from '@/components/dashboard/MoneyDashboardInfo';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { IFinanceGroup, MonthScrollItem } from '@/types/types';
import DashboardBottomSheet from '@/components/dashboard/DashboardBottomSheet';
import { useUser } from '@clerk/clerk-expo';
import { generateMonthData } from '@/utils/date.utils';
import { useFetchFinancesByMonth } from '@/hooks/fetch-finances-by-month.hook';
import CustomActivityIndicator from '@/components/ui/CustomActivityIndicator';
import useFetchBalances from '@/components/dashboard/hooks/useFetchBalances';
import { useFinanceStore } from '@/store/useFinanceStore';

const INITIAL_SELECTED_MONTH_ID = new Date()
  .toLocaleString('default', { month: 'numeric', year: 'numeric' })
  .replace('/', '-');

const Page = () => {
  const flatListRef = useRef<FlatList<IFinanceGroup>>(null);
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { user } = useUser();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [wallet, setWallet] = useState('Wallet 1');
  const [selectedMonthId, setSelectedMonthId] = useState(
    INITIAL_SELECTED_MONTH_ID
  );
  const [monthsList, setMonthsList] = useState<MonthScrollItem[]>([]);

  const {
    // groups,
    handleLoadMore,
    refreshFinances,
    loading,
  } = useFetchFinancesByMonth(selectedMonthId);

  const {
    expenseBalance,
    incomeBalance,
    formatedBalance,
    loading: loadingBalances,
  } = useFetchBalances();

  const {
    finances,
    groups,
    error,
    loading: financesLoading,
  } = useFinanceStore();

  useEffect(() => {
    if (!user?.createdAt) return;

    const months: MonthScrollItem[] = generateMonthData(user?.createdAt);
    setMonthsList(months);
  }, [user]);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [selectedMonthId]);

  const liniarGradientColors: string[] = [
    'rgba(255,255,255,0.6)',
    'rgba(0,0,0,0.4)',
  ];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        blurRadius={10}
        source={require('@/assets/images/dashboard-bg.png')}
        style={{ flex: 1 }}
      >
        <LinearGradient colors={liniarGradientColors} style={{ flex: 1 }}>
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
              data={monthsList}
              selectedId={selectedMonthId}
              setSelectedId={setSelectedMonthId}
            />
          </View>
          {monthsList.length > 0 ? (
            <MoneyDashboardInfo
              selectedMonth={
                monthsList.find((month) => month.id === selectedMonthId)!
              }
              expenseBalance={expenseBalance}
              incomeBalance={incomeBalance}
              loading={loadingBalances}
              formatedBalance={formatedBalance}
            />
          ) : (
            <CustomActivityIndicator />
          )}
          <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
            <DashboardBottomSheet
              loading={loading}
              groups={groups}
              refreshFinances={refreshFinances}
              handleLoadMore={handleLoadMore}
              bottomSheetRef={bottomSheetRef}
            />
          </GestureHandlerRootView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Page;
