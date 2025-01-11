import { StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@/constants/colors';
import { MonthScrollItem } from '@/types/types';
import { useFinanceStore } from '@/store/useFinanceStore';
import { memo } from 'react';

type MoneyDashboardInfoProps = {
  selectedMonth: MonthScrollItem;
  expenseBalance: number;
  incomeBalance: number;
  loading: boolean;
  formatedBalance: string;
};

const MoneyDashboardInfo = ({
  selectedMonth,
  expenseBalance,
  incomeBalance,
  loading,
  formatedBalance,
}: MoneyDashboardInfoProps) => {
  const { loading: storeLoading } = useFinanceStore();

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Month balance</Text>
      <Text style={styles.mainBalance}>
        {storeLoading ? 'Loading...' : formatedBalance}
      </Text>

      <View>
        <Text style={styles.secondaryTitle}>{`${
          storeLoading ? 'Loading...' : `In ${selectedMonth.text}`
        }:`}</Text>
        <View style={styles.secondaryContainer}>
          <View style={styles.secondaryBalanceWrapper}>
            <AntDesign name="arrowup" size={24} color="black" />

            <Text style={styles.secondaryBalance}>
              {storeLoading ? 'Loading...' : `${incomeBalance.toFixed(2)} zł`}
            </Text>
          </View>
          <View style={styles.secondaryBalanceWrapper}>
            <AntDesign name="arrowdown" size={24} color="black" />
            <Text style={styles.secondaryBalance}>
              {storeLoading ? 'Loading...' : `${expenseBalance.toFixed(2)} zł`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(MoneyDashboardInfo);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#210e1b',
    paddingBottom: 5,
  },
  mainBalance: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
    paddingBottom: 20,
  },
  secondaryTitle: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: '600',
    color: '#210e1b',
    textAlign: 'center',
    paddingBottom: 10,
  },
  secondaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  secondaryBalanceWrapper: { flexDirection: 'row', gap: 5 },
  secondaryBalance: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
  },
});
