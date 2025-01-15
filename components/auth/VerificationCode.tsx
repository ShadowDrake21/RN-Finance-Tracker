import { Text } from 'react-native';
import React, { useEffect } from 'react';
import { useVerification } from '@/contexts/VerificationContext';
import { STYLES } from '@/constants/styles';
import CustomButton from '../ui/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomKeyboardAvoidingView from '../shared/CustomKeyboardAvoidingView';
import LottieView from 'lottie-react-native';
import VerificationCodeField from './verification-components/VerificationCodeField';

const VerificationCode = ({
  type,
  onVerify,
}: {
  type: 'sign-up' | 'reset';
  onVerify: () => Promise<void>;
}) => {
  const { bottom } = useSafeAreaInsets();

  const { code, setCode, resetCode, setResetCode } = useVerification();

  const value = type === 'sign-up' ? code : resetCode;
  const setValue = type === 'sign-up' ? setCode : setResetCode;

  useEffect(() => {
    if (type === 'reset') {
      setResetCode('');
    } else {
      setCode('');
    }
  }, []);

  return (
    <CustomKeyboardAvoidingView
      offset={80}
      style={[STYLES.authKeyboardAvoidingView, { paddingBottom: bottom }]}
    >
      <LottieView
        source={require('@/assets/animations/letter.lottie')}
        autoPlay
        loop
        speed={0.5}
        style={{ width: 200, height: 200 }}
      />
      <Text style={[STYLES.authSubtitle, { textAlign: 'center' }]}>
        We've sent a verification code to your email address.
      </Text>
      <VerificationCodeField value={value} setValue={setValue} />
      <CustomButton onPress={onVerify}>Verify</CustomButton>
    </CustomKeyboardAvoidingView>
  );
};

export default VerificationCode;
