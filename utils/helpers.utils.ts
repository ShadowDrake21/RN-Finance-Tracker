import { Finances } from '@/types/types';
import { Alert } from 'react-native';

type CustomAlertProps = {
  title?: string;
  message: string;
  btnText?: string;
};

export const CustomAlert = ({
  title = 'Whoops!',
  message,
  btnText = 'OK, got it',
}: CustomAlertProps) => {
  Alert.alert(title, message, [{ text: btnText, style: 'destructive' }]);
};

export function sumFormat(num: number) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const getIconPathParts = (icon_type: string) => {
  const [category, name] = icon_type.split('/');

  return [category, name];
};

export const calcSum = (
  type: 'expense' | 'income' | 'all',
  prices: { price: number }[]
) =>
  prices.reduce((acc, price) => {
    if (type === 'expense' && price.price < 0) {
      return acc + Math.abs(price.price);
    } else if (type === 'income' && price.price > 0) {
      return acc + price.price;
    } else if (type === 'all') {
      return acc + price.price;
    }
    return acc;
  }, 0);

export const calculateBalance = (
  finances: Finances[],
  type: 'income' | 'expense'
) => {
  return finances
    .filter((finance) => finance.type === type)
    .reduce((acc, finance) => acc + finance.price, 0);
};

export const generateRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 0xffffff);

  return `#${randomColor.toString(16).padStart(6, '0')}`;
};

export const INITIAL_SELECTED_MONTH_ID = new Date()
  .toLocaleString('default', { month: 'numeric', year: 'numeric' })
  .replace('/', '-');
