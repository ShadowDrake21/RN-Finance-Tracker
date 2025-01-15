import { useUser } from '@clerk/clerk-expo';
import { createContext, useContext, useState } from 'react';
import {
  Control,
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';

type ProfileEditContextType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  resetField: (field: 'name' | 'password') => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordChange: boolean;
  setIsPasswordChange: React.Dispatch<React.SetStateAction<boolean>>;
  nameLoading: boolean;
  setNameLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileEditContext = createContext<ProfileEditContextType | undefined>(
  undefined
);

export const ProfileEditProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [name, setName] = useState(user?.fullName || '');
  const [password, setPassword] = useState('');
  const [nameLoading, setNameLoading] = useState(false);

  const onReset = (field: 'name' | 'password') => {
    if (field === 'name') {
      setName('');
    }
    if (field === 'password') {
      setPassword('');
    }
  };

  return (
    <ProfileEditContext.Provider
      value={{
        name,
        setName,
        password,
        setPassword,
        resetField: onReset,
        isEditing,
        setIsEditing,
        isPasswordChange,
        setIsPasswordChange,
        nameLoading,
        setNameLoading,
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export const useProfileEdit = () => {
  const context = useContext(ProfileEditContext);

  if (!context) {
    throw new Error('useProfileEdit must be within a ProfileEditProvider');
  }

  return context;
};
