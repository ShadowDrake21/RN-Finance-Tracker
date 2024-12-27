import { createContext, PropsWithChildren, useContext, useState } from 'react';

type VerificationContextType = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  resetCode: string;
  setResetCode: React.Dispatch<React.SetStateAction<string>>;
};

const VerificationContext = createContext<VerificationContextType | undefined>(
  undefined
);

export const VerificationProvider = ({ children }: PropsWithChildren) => {
  const [code, setCode] = useState('');
  const [resetCode, setResetCode] = useState('');

  return (
    <VerificationContext.Provider
      value={{ code, setCode, resetCode, setResetCode }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);

  if (!context) {
    throw new Error('useVerification must be within a VerificationProvider');
  }
  return context;
};
