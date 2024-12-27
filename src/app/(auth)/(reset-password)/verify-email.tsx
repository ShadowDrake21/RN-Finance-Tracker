import { Alert } from 'react-native';
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { callToast } from '@/utils/toasts.utils';
import VerificationCode from '@/components/VerificationCode';
import { useVerification } from '@/contexts/VerificationContext';

const Page = () => {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { resetCode: code } = useVerification();
  const [error, setError] = useState('');

  const onVerify = async () => {
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
      })
      .then((result) => {
        if (result.status === 'needs_new_password') {
          router.replace('/set-password');
          setError('');
        } else {
          setError('Code verification failed. Please try again.');
          callToast({
            type: 'error',
            text1: 'Code verification failed',
            text2: 'Please try again or contact support if the issue persists.',
          });
        }
      })
      .catch((err) => {
        setError(err.errors[0].longMessage);
        Alert.alert('You have encountered an error!', error, [
          { text: 'OK', style: 'destructive' },
        ]);
      });
  };

  return <VerificationCode type="reset" onVerify={onVerify} />;
};

export default Page;
