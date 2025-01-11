import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { liniarGradientColors } from '@/constants/gradients';

const Page = () => {
  console.log('Dashboard render');

  const flatListRef = useRef<FlatList<IFinanceGroup>>(null);
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { user } = useUser();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [wallet, setWallet] = useState('Wallet 1');
  const [monthsList, setMonthsList] = useState<MonthScrollItem[]>([]);
  const { monthId, groups, loading: financesLoading } = useFinanceStore();
  const { handleLoadMore, refreshFinances } = useFetchFinancesByMonth(monthId);

  const {
    expenseBalance,
    incomeBalance,
    formatedBalance,
    loading: loadingBalances,
  } = useFetchBalances();

  useEffect(() => {
    if (!user?.createdAt) return;
    const months: MonthScrollItem[] = generateMonthData(user?.createdAt);
    setMonthsList(months);
  }, [user]);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [monthId]);

  const renderHeader = useCallback(
    (headerTintColor: string | undefined) => (
      <MainHeader
        headerTintColor={headerTintColor}
        top={top}
        wallet={wallet}
        setWallet={setWallet}
      />
    ),
    [top, wallet]
  );

  const renderMonthScrollList = useCallback(
    () => <MonthScrollList data={monthsList} />,
    [monthsList, monthId]
  );

  const renderMoneyDashboardInfo = useCallback(
    () => (
      <MoneyDashboardInfo
        selectedMonth={monthsList.find((month) => month.id === monthId)!}
        expenseBalance={expenseBalance}
        incomeBalance={incomeBalance}
        formatedBalance={formatedBalance}
      />
    ),
    [monthId, expenseBalance, incomeBalance, formatedBalance]
  );

  const renderDashboardBottomSheet = useCallback(
    () => (
      <DashboardBottomSheet
        loading={financesLoading}
        groups={groups}
        refreshFinances={refreshFinances}
        handleLoadMore={handleLoadMore}
        bottomSheetRef={bottomSheetRef}
      />
    ),
    [financesLoading, groups, refreshFinances]
  );

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
              header: ({ options: { headerTintColor } }) =>
                renderHeader(headerTintColor),
            }}
          />
          <View style={{ paddingTop: headerHeight }}>
            {monthsList.length > 0 && renderMonthScrollList()}
          </View>
          {monthsList.length > 0 ? (
            renderMoneyDashboardInfo()
          ) : (
            <CustomActivityIndicator />
          )}
          <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
            {renderDashboardBottomSheet()}
          </GestureHandlerRootView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Page;
