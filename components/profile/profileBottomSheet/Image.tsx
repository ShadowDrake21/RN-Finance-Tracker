import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Loader from '@/components/shared/Loader';
import { useUser } from '@clerk/clerk-expo';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import usePickImage from '@/hooks/usePickImage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ProfileBottomSheetListImage = () => {
  const { user } = useUser();
  const { imageLoading, selectedImage, setSelectedImage } = useProfileEdit();
  const { pickImage } = usePickImage();

  const onPickImage = async () => {
    const base64Image = await pickImage();

    if (base64Image) {
      setSelectedImage(base64Image);
    }
  };
  return (
    <TouchableOpacity
      onPress={onPickImage}
      style={{ marginBottom: 15, position: 'relative' }}
    >
      {!selectedImage && (
        <View style={styles.imageIconContainer}>
          <MaterialCommunityIcons
            name="image-edit-outline"
            size={40}
            color="black"
          />
        </View>
      )}
      {imageLoading && <Loader style={styles.imageLoader} />}
      <Image
        source={{
          uri:
            selectedImage.length > 0
              ? selectedImage
              : user?.hasImage
              ? user.imageUrl
              : 'https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg',
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default ProfileBottomSheetListImage;

const styles = StyleSheet.create({
  imageIconContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    position: 'absolute',
    zIndex: 20,
    top: 10,
    right: 10,
  },
  imageLoader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 20,
  },
  image: { width: '100%', aspectRatio: 1, borderRadius: 15 },
});
