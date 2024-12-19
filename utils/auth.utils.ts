import { useCallback } from 'react';
import { callToast } from './toasts.utils';
import { Alert } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export const useSocialAuth = () => {
  const router = useRouter();
  const { startOAuthFlow: googleOAuth } = useOAuth({
    strategy: 'oauth_google',
  });
  const { startOAuthFlow: appleOAuth } = useOAuth({
    strategy: 'oauth_apple',
  });

  const onSocialAuth = useCallback(
    async ({
      type,
      setLoading,
    }: {
      type: 'google' | 'apple';
      setLoading: (a: boolean) => void;
    }) => {
      try {
        const { createdSessionId, setActive } =
          type === 'google' ? await googleOAuth() : await appleOAuth();

        if (createdSessionId) {
          setLoading(true);
          await setActive!({ session: createdSessionId });
          router.replace('/(tabs)/dashboard');
          setLoading(false);
        } else {
          callToast({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Try again, maybe that will work!',
          });
        }
      } catch (err: any) {
        Alert.alert('Whoops!', err.message, [{ text: 'OK, got it' }]);
      }
    },
    [googleOAuth, appleOAuth, router]
  );

  return { onSocialAuth };
};
