import { StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@/constants/colors';
import { MoneyDashboardInfoProps, MonthScrollItem } from '@/types/types';
import { useFinanceStore } from '@/store/useFinanceStore';
import { memo } from 'react';

const MoneyDashboardInfo = ({
  selectedMonth,
  expenseBalance,
  incomeBalance,
  formatedBalance,
}: MoneyDashboardInfoProps) => {
  const { loading } = useFinanceStore();

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Month balance</Text>
      <Text style={styles.mainBalance}>
        {loading ? 'Loading...' : formatedBalance}
      </Text>

      <View>
        <Text style={styles.secondaryTitle}>{`${
          loading ? 'Loading...' : `In ${selectedMonth.text}`
        }:`}</Text>
        <View style={styles.secondaryContainer}>
          <View style={styles.secondaryBalanceWrapper}>
            <AntDesign name="arrowup" size={24} color="black" />

            <Text style={styles.secondaryBalance}>
              {loading ? 'Loading...' : `${incomeBalance.toFixed(2)} zł`}
            </Text>
          </View>
          <View style={styles.secondaryBalanceWrapper}>
            <AntDesign name="arrowdown" size={24} color="black" />
            <Text style={styles.secondaryBalance}>
              {loading ? 'Loading...' : `${expenseBalance.toFixed(2)} zł`}
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
