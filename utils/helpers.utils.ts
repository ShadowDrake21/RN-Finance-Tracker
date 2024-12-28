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
