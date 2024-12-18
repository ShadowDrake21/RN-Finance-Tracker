import Toast, { ToastShowParams } from 'react-native-toast-message';

export const callToast = ({ ...props }: ToastShowParams) => {
  Toast.show({
    ...props,
    text1Style: { fontSize: 16, fontWeight: '600' },
    text2Style: { fontSize: 14 },
    topOffset: 60,
    visibilityTime: 3000,
    swipeable: true,
  });
};
