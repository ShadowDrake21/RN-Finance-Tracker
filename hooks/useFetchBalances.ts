import { useFinanceStore } from '@/store/useFinanceStore';
import { calculateBalance } from '@/utils/helpers.utils';
import { useEffect, useState } from 'react';
import { formatCurrency } from 'react-native-format-currency';

const useFetchBalances = () => {
  const [expenseBalance, setExpenseBalance] = useState(0);
  const [incomeBalance, setIncomeBalance] = useState(0);
  const [formatedBalance, setFormatedBalance] = useState('');
  const [loading, setLoading] = useState(false);

  const { finances } = useFinanceStore();

  useEffect(() => {
    setLoading(true);
    const calculatedIncomeBalance = calculateBalance(finances, 'income');
    const calculatedExpenseBalance = calculateBalance(finances, 'expense');

    const [valueFormattedWithSymbol] = formatCurrency({
      amount: +(calculatedIncomeBalance + calculatedExpenseBalance).toFixed(2),
      code: 'PLN',
    });

    setIncomeBalance(calculatedIncomeBalance);
    setExpenseBalance(calculatedExpenseBalance);
    setFormatedBalance(valueFormattedWithSymbol);

    setLoading(false);
  }, [finances]);

  return { expenseBalance, incomeBalance, formatedBalance, loading };
};

export default useFetchBalances;
