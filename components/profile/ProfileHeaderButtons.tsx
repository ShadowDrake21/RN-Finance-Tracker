import React from 'react';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import EditingButtons from './header/EditingButtons';
import NonEditingButtons from './header/NonEditingButtons';

const ProfileHeaderButtons = () => {
  const { isEditing, setIsEditing } = useProfileEdit();

  return (
    <>
      {isEditing ? (
        <EditingButtons />
      ) : (
        <NonEditingButtons onPress={() => setIsEditing((prev) => !prev)} />
      )}
    </>
  );
};

export default ProfileHeaderButtons;
