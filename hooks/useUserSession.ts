import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useUserSession = () => {
  const { getToken, userId } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const getTokenRef = useRef(getToken);

  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  const fetchToken = useCallback(async () => {
    console.log('Fetching token for user:', userId);
    setSessionLoading(true);
    try {
      const token = await getTokenRef.current({ template: 'supabase' });
      console.log('Token fetched:', token);
      setToken(token);
    } catch (error) {
      console.error('Error fetching token:', error);
    } finally {
      setSessionLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchToken();
    }
  }, [fetchToken, userId]);

  useEffect(() => {
    console.log('Session loading state changed:', sessionLoading);
  }, [sessionLoading]);

  return { token, userId, sessionLoading, fetchToken };
};
