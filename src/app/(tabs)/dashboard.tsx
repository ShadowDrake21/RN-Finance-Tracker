import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
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
import { dummyBalanceData, IDayBalance } from '@/dummy/dummy-balance-data';
import { compareDashboardDates } from '@/utils/date.utils';
import { dummyMonthData } from '@/dummy/dummy-month-data';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import DashboardActivityItem from '@/components/DashboardActivityItem';

const Page = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [wallet, setWallet] = useState('Wallet 1');
  const [selectedMonthId, setSelectedMonthId] = useState('11-2024');
  const [rawCurrentBalance, setRawCurrentBalance] = useState(13456.56);
  const [formattedCurrentBalance, setFormattedCurrentBalance] = useState('');
  const [visibleData, setVisibleData] = useState<IDayBalance[]>([]);
  const [page, setPage] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    const [valueFormattedWithSymbol] = formatCurrency({
      amount: rawCurrentBalance,
      code: 'PLN',
    });
    setFormattedCurrentBalance(valueFormattedWithSymbol);

    console.log(selectedMonthId);

    if (visibleData.length > 0 || page !== 0 || lastIndex !== 0) {
      setVisibleData([]);
      setPage(0);
      setLastIndex(0);
    }
  }, [selectedMonthId]);

  useEffect(() => {
    const filtered: IDayBalance[] = [];
    for (let i = lastIndex; i < dummyBalanceData.length; i++) {
      if (compareDashboardDates(selectedMonthId, dummyBalanceData[i].date)) {
        filtered.push(dummyBalanceData[i]);
        if (filtered.length === 5) {
          console.log('lastIndex', i + 1);
          setLastIndex(i + 1);
          break;
        }
      }
    }

    setVisibleData((prevData) => [...prevData, ...filtered]);
  }, [selectedMonthId, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
                  data={visibleData}
                  style={{ width: '100%' }}
                  initialNumToRender={2}
                  maxToRenderPerBatch={5}
                  keyExtractor={(item) => item.date.toString()}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item }) => <DashboardActivityItem {...item} />}
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
