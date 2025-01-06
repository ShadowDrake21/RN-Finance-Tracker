import { useAuth, useUser } from '@clerk/clerk-expo';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type UserSessionContextType = {
  userId: string;
  token: string;
};

const UserSessionContext = createContext<UserSessionContextType | undefined>(
  undefined
);

export const UserSessionProvider = ({ children }: PropsWithChildren) => {
  const { user } = useUser();
  const { getToken: getAuthToken } = useAuth();

  const [authState, setAuthState] = useState({
    userId: '',
    token: '',
  });

  const getToken = useCallback(
    async () => getAuthToken({ template: 'supabase' }),
    [getAuthToken]
  );

  const fetchToken = useCallback(async () => {
    if (!user || authState.token.length > 0) {
      return;
    }

    try {
      const token = (await getToken()) || '';
      setAuthState((prev) => ({ ...prev, userId: user.id, token }));
    } catch (error) {}
  }, [user, getToken, authState.token]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  const contextValue = useMemo(
    () => ({
      userId: authState.userId,
      token: authState.token,
    }),
    [authState]
  );

  return (
    <UserSessionContext.Provider value={contextValue}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error('useSession must be within a SessionProvider');
  }

  return context;
};
