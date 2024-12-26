import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
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
import FinanceItem from '@/components/FinanceItem';
import { IFinanceGroup } from '@/types/types';
import { useFetchFinances } from '@/hooks/fetch-finances.hook';
import { FlashList } from '@shopify/flash-list';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import DashboardBottomSheet from '@/components/DashboardBottomSheet';

const Page = () => {
  const flatListRef = useRef<FlatList<IFinanceGroup>>(null);
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [wallet, setWallet] = useState('Wallet 1');
  const [selectedMonthId, setSelectedMonthId] = useState('12-2024');
  const [rawCurrentBalance, setRawCurrentBalance] = useState(13456.56);
  const [formattedCurrentBalance, setFormattedCurrentBalance] = useState('');

  const { groups, handleLoadMore, loading } = useFetchFinances(selectedMonthId);

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
            <DashboardBottomSheet
              selectedMonthId={selectedMonthId}
              bottomSheetRef={bottomSheetRef}
            />
          </GestureHandlerRootView>

          {/* <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={['60%', '85%']}
              index={1}
              handleStyle={{ paddingTop: 10, paddingBottom: 0 }}
              containerStyle={{ paddingBottom: 75 }}
              style={styles.container}
            >
              <BottomSheetView style={styles.contentContainer}>
                <View style={{ flex: 1, width: '100%' }}>
                  {loading && (
                    <CustomActivityIndicator
                      size="large"
                      style={{ marginVertical: 20 }}
                    />
                  )}
                  <FlashList
                    estimatedItemSize={100}
                    data={groups}
                    contentContainerStyle={{
                      paddingBottom: 75,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.date}
                    onEndReached={() => {
                      handleLoadMore();
                      bottomSheetRef.current?.expand();
                    }}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => <FinanceItem {...item} />}
                  />
                </View>
              </BottomSheetView>
            </BottomSheet>
          </GestureHandlerRootView> */}
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
