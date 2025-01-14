import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import { Controller, useForm } from 'react-hook-form';
import CustomTextInput from '../ui/CustomTextInput';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import CustomButton from '../ui/CustomButton';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileBottomSheetList = () => {
  const { bottom } = useSafeAreaInsets();
  const { user } = useUser();
  const { signOut } = useAuth();
  const { control, isEditing, isPasswordChange, setIsPasswordChange } =
    useProfileEdit();

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

  const onDeleteProfile = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          isPreferred: true,
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <GeneralBottomSheetList>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: bottom + 50 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
            }}
          >
            {isEditing ? (
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value, onBlur } }) => (
                  <CustomTextInput
                    placeholder="Email"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    propStyles={{ marginBottom: 10, flex: 1 }}
                  />
                )}
              />
            ) : (
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
            )}
          </View>
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
                paddingBottom: 20,
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
                  style={{
                    textAlign: 'center',
                    color: COLORS.extraDarkPrimary,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={{ paddingBottom: 10 }}>
            Email: {user?.emailAddresses[0].emailAddress}
          </Text>
          <Text style={{ paddingBottom: 10 }}>
            Last Sign In:{' '}
            {user?.lastSignInAt
              ? format(user?.lastSignInAt, "dd/MM/yyyy 'at' HH:mm")
              : 'No data'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            {isPasswordChange ? (
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value, onBlur } }) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                    }}
                  >
                    <CustomTextInput
                      placeholder="Password"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      secureTextEntry={true}
                      propStyles={{ flex: 1 }}
                    />
                    <CustomButton
                      style={{
                        width: 100,
                        backgroundColor: COLORS.darkPrimary,
                      }}
                      onPress={() => setIsPasswordChange(false)}
                    >
                      Save
                    </CustomButton>
                    <CustomButton
                      style={{ width: 100, backgroundColor: 'black' }}
                      onPress={() => setIsPasswordChange(false)}
                    >
                      Cancel
                    </CustomButton>
                  </View>
                )}
              />
            ) : (
              <CustomButton
                style={{ backgroundColor: COLORS.mainTint }}
                onPress={() => setIsPasswordChange(true)}
              >
                Change Password
              </CustomButton>
            )}
          </View>
          <CustomButton
            style={{ marginBottom: 10, backgroundColor: COLORS.selected }}
            onPress={() => onDeleteProfile()}
          >
            Delete Profile
          </CustomButton>
          <CustomButton onPress={() => signOut()}>Sign Out</CustomButton>
        </View>
      </ScrollView>
    </GeneralBottomSheetList>
  );
};

export default ProfileBottomSheetList;

const styles = StyleSheet.create({});
