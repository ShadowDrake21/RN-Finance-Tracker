import { useUser } from '@clerk/clerk-expo';
import { createContext, useContext, useState } from 'react';
import { Control, useForm, UseFormReset } from 'react-hook-form';

type ProfileEditContextType = {
  control: Control<
    {
      name: string;
      password: string;
    },
    any
  >;
  resetField: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordChange: boolean;
  setIsPasswordChange: React.Dispatch<React.SetStateAction<boolean>>;
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
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.fullName!,
      password: '',
    },
  });

  const onReset = () => {
    reset({
      name: user?.fullName!,
    });
  };

  return (
    <ProfileEditContext.Provider
      value={{
        control,
        resetField: onReset,
        isEditing,
        setIsEditing,
        isPasswordChange,
        setIsPasswordChange,
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
