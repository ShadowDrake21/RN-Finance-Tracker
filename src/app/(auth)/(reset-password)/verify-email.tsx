import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { callToast } from '@/utils/toasts.utils';
import VerificationCode from '@/components/VerificationCode';
import { useVerification } from '@/contexts/VerificationContext';
import { CustomAlert } from '@/utils/helpers.utils';

const Page = () => {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { resetCode: code, setResetCode } = useVerification();

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      setResetCode('');
      setIsError(false);
    }
  }, [isError]);

  const onVerify = async () => {
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
      })
      .then((result) => {
        if (result.status === 'needs_new_password') {
          router.replace('/set-password');
        } else {
          setIsError(true);
          callToast({
            type: 'error',
            text1: 'Code verification failed',
            text2: 'Please try again or contact support if the issue persists.',
          });
        }
      })
      .catch((err) => {
        const errorMessage = err.errors[0].longMessage;

        setIsError(true);

        CustomAlert({
          title: 'You have encountered an error!',
          message: errorMessage,
        });

        if (err.toString().includes('Too many failed attempts')) {
          router.replace('/sign-in');
        }
      });
  };

  return <VerificationCode type="reset" onVerify={onVerify} />;
};

export default Page;
