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
import Loader from '../shared/Loader';
import CustomKeyboardAvoidingView from '../shared/CustomKeyboardAvoidingView';
import { CustomAlert } from '@/utils/helpers.utils';

const ProfileBottomSheetList = () => {
  const { bottom } = useSafeAreaInsets();
  const { user } = useUser();
  const { signOut } = useAuth();
  const {
    name,
    setName,
    password,
    setPassword,
    isEditing,
    isPasswordChange,
    setIsPasswordChange,
    nameLoading,
    resetField,
  } = useProfileEdit();

  const [imageLoading, setImageLoading] = useState(false);
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

  const saveSelection = async () => {
    console.log('Save image');
    setImageLoading(true);
    await user?.setProfileImage({ file: selectedImage });
    setSelectedImage('');
    setImageLoading(false);
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
          text: 'Yes, I am sure',
          onPress: deleteProfile,
          style: 'destructive',
        },
      ]
    );
  };

  const deleteProfile = async () => {
    try {
      await user?.delete();
    } catch (error) {
      CustomAlert({ title: 'Error', message: error.message });
    }
  };

  const onChangePassword = () => {
    Alert.prompt(
      'Current Password',
      'Please enter your current password',
      [
        {
          text: 'Cancel',
          onPress: () => {
            resetField('password');
            setIsPasswordChange(false);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: (currentPassword) => {
            changePassword(currentPassword);
          },
        },
      ],
      'secure-text'
    );
  };

  const changePassword = async (currentPassword: string | undefined) => {
    try {
      await user?.updatePassword({ currentPassword, newPassword: password });
      CustomAlert({
        title: 'Password changed!',
        message: 'From now on, use your new password to sign in.',
      });
    } catch (error) {
      CustomAlert({ title: 'Error', message: error.message });
    } finally {
      resetField('password');
      setIsPasswordChange(false);
    }
  };

  return (
    <GeneralBottomSheetList>
      <CustomKeyboardAvoidingView offset={150}>
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
                <CustomTextInput
                  placeholder="Name"
                  onChangeText={setName}
                  value={name}
                  propStyles={{ marginBottom: 10, flex: 1 }}
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
                  {nameLoading ? 'Saving...' : user?.fullName}
                </Text>
              )}
            </View>

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
              {imageLoading && (
                <Loader
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    zIndex: 20,
                  }}
                />
              )}
              <Image
                source={{
                  uri:
                    selectedImage && selectedImage.length > 0
                      ? selectedImage
                      : user?.hasImage
                      ? user.imageUrl
                      : 'https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg',
                }}
                style={{ width: '100%', aspectRatio: 1, borderRadius: 15 }}
              />
            </TouchableOpacity>

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

            {user?.externalAccounts.length === 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                {isPasswordChange ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <CustomTextInput
                      placeholder="Password"
                      onChangeText={setPassword}
                      value={password}
                      secureTextEntry={true}
                      propStyles={{ flex: 1 }}
                    />
                    <CustomButton
                      style={{
                        width: 100,
                        backgroundColor: COLORS.darkPrimary,
                      }}
                      onPress={onChangePassword}
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
                ) : (
                  <CustomButton
                    style={{ backgroundColor: COLORS.mainTint }}
                    onPress={() => setIsPasswordChange(true)}
                  >
                    Change Password
                  </CustomButton>
                )}
              </View>
            )}
            <CustomButton
              style={{ marginBottom: 10, backgroundColor: COLORS.selected }}
              onPress={() => onDeleteProfile()}
            >
              Delete Profile
            </CustomButton>
            <CustomButton onPress={() => signOut()}>Sign Out</CustomButton>
          </View>
        </ScrollView>
      </CustomKeyboardAvoidingView>
    </GeneralBottomSheetList>
  );
};

export default ProfileBottomSheetList;

const styles = StyleSheet.create({});
