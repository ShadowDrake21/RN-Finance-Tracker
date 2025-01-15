import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { useUser } from '@clerk/clerk-expo';
import { useProfileEdit } from '@/contexts/ProfileEditContext';

const ProfileBottomSheetListName = () => {
  const { user } = useUser();
  const { name, setName, isEditing, nameLoading } = useProfileEdit();

  return (
    <View style={styles.nameContainer}>
      {isEditing ? (
        <CustomTextInput
          placeholder="Name"
          onChangeText={setName}
          value={name}
          propStyles={{ marginBottom: 10, flex: 1 }}
        />
      ) : (
        <Text style={styles.nameText}>
          {nameLoading ? 'Saving...' : user?.fullName}
        </Text>
      )}
    </View>
  );
};

export default ProfileBottomSheetListName;

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 20,
  },
});
