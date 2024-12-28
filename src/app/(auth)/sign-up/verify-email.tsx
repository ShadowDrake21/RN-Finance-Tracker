import React, { useState } from 'react';
import { useVerification } from '@/contexts/VerificationContext';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import VerificationCode from '@/components/VerificationCode';
import Loader from '@/components/Loader';
import { CustomAlert } from '@/utils/helpers.utils';

const Page = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { code } = useVerification();
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      console.log('onVerifyPress', code);

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(tabs)/dashboard');
      } else {
        CustomAlert({
          message: 'Something went wrong!',
        });
      }
    } catch (err: any) {
      CustomAlert({
        message: err.message,
      });

      if (err.toString().includes('Too many failed attempts')) {
        router.replace('/sign-in');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return <VerificationCode type="sign-up" onVerify={onVerify} />;
};

export default Page;
