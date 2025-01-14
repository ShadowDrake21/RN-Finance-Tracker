import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import GeneralBottomSheetList from '../shared/GeneralBottomSheetList';
import { useUser } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { useAuth } from '@clerk/clerk-react';

const ProfileBottomSheetList = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [selectedImage, setSelectedImage] = useState<string>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setSelectedImage(base64Image);
    }
  };

  const cancelSelection = () => {
    setSelectedImage('');
  };

  const saveSelection = () => {
    console.log('Save image');
  };

  return (
    <GeneralBottomSheetList>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
          paddingBottom: 20,
        }}
      >
        {user?.fullName}
      </Text>
      {user?.hasImage && (
        <TouchableOpacity
          onPress={pickImage}
          style={{ marginBottom: 15, position: 'relative' }}
        >
          {!selectedImage && (
            <View
              style={{
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 15,
                position: 'absolute',
                zIndex: 20,
                top: 10,
                right: 10,
              }}
            >
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={40}
                color="black"
              />
            </View>
          )}
          <Image
            source={{
              uri:
                selectedImage && selectedImage.length > 0
                  ? selectedImage
                  : user.imageUrl,
            }}
            style={{ width: '100%', aspectRatio: 1, borderRadius: 15 }}
          />
        </TouchableOpacity>
      )}
      {selectedImage && (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 15,
          }}
        >
          <TouchableOpacity
            onPress={cancelSelection}
            style={{
              flex: 1,
              borderWidth: 2,
              borderColor: 'darkred',
              backgroundColor: '#ff7f7f',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: '#7f0000' }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveSelection}
            style={{
              flex: 1,
              borderWidth: 2,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.lightPrimary,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ textAlign: 'center', color: COLORS.extraDarkPrimary }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Text>
        Last Sign In:{' '}
        {user?.lastSignInAt
          ? format(user?.lastSignInAt, "dd/MM/yyyy 'at' HH:mm")
          : 'No data'}
      </Text>
      <Text>{user?.emailAddresses[0].emailAddress}</Text>
      {/* change password and delete */}
      <Button title="Sign Out" onPress={() => signOut()} />
    </GeneralBottomSheetList>
  );
};

export default ProfileBottomSheetList;

const styles = StyleSheet.create({});
