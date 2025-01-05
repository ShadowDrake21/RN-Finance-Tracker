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
