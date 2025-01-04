import { useEffect, useState, useRef } from 'react';
import { formatCurrency } from 'react-native-format-currency';
import { MonthScrollItem } from '@/types/types';

const useFetchBalances = (
  selectedMonthId: string,
  getFinanceSumByMonth: ({
    type,
  }: {
    type: 'expense' | 'income';
  }) => Promise<number | undefined>
) => {
  const [expenseBalance, setExpenseBalance] = useState(0);
  const [incomeBalance, setIncomeBalance] = useState(0);
  const [formatedBalance, setFormatedBalance] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      const fetchedExpenseBalance = await getFinanceSumByMonth({
        type: 'expense',
      });
      setExpenseBalance(fetchedExpenseBalance ?? 0);

      const fetchedIncomeBalance = await getFinanceSumByMonth({
        type: 'income',
      });
      setIncomeBalance(fetchedIncomeBalance ?? 0);

      const [valueFormattedWithSymbol] = formatCurrency({
        amount: +(fetchedIncomeBalance! - fetchedExpenseBalance!).toFixed(2),
        code: 'PLN',
      });
      setFormatedBalance(valueFormattedWithSymbol);
      setLoading(false);
    };

    fetchBalances();
  }, [selectedMonthId]);

  return { expenseBalance, incomeBalance, formatedBalance, loading };
};

export default useFetchBalances;
