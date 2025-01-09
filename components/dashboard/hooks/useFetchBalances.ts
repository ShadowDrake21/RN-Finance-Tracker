import { useFinanceStore } from '@/store/useFinanceStore';
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
    const calculatedIncomeBalance = finances
      .filter((finance) => finance.type === 'income')
      .reduce((acc, finance) => acc + finance.price, 0);

    const calculatedExpenseBalance = finances
      .filter((finance) => finance.type === 'expense')
      .reduce((acc, finance) => acc + finance.price, 0);

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
