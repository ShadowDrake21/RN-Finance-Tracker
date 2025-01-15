import { useUser } from '@clerk/clerk-expo';
import { createContext, useContext, useState } from 'react';

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
  saveName: () => Promise<void>;
  imageLoading: boolean;
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  saveSelection: () => Promise<void>;
  cancelSelection: () => void;
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
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const onReset = (field: 'name' | 'password') => {
    if (field === 'name') {
      setName('');
    }
    if (field === 'password') {
      setPassword('');
    }
  };

  const saveName = async () => {
    setNameLoading(true);
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    await user?.update({ firstName, lastName });
    setNameLoading(false);
  };

  const saveSelection = async () => {
    console.log('Save image');
    setImageLoading(true);
    await user?.setProfileImage({ file: selectedImage });
    setSelectedImage('');
    setImageLoading(false);
  };

  const cancelSelection = () => {
    setSelectedImage('');
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
        saveName,
        imageLoading,
        setImageLoading,
        selectedImage,
        setSelectedImage,
        saveSelection,
        cancelSelection,
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
