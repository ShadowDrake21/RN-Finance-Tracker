import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  withTiming,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import AddFinanceButton from './AddFinanceButton';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import { downloadImage } from '@/supabase/supabase.storage';
import { useAuth } from '@clerk/clerk-expo';
import FinanceImage from '@/components/shared/FinanceImage';

const PickImage = () => {
  const {
    financeForm: { id, image, action },
    setField,
  } = useFinanceForm();

  const { userId, getToken } = useAuth();
  const [validImage, setValidImage] = useState('');

  const fadeAnim = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

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
      setField('prevImage', image);
      setField('image', base64Image);
      setValidImage(base64Image);
    }
  };

  useEffect(() => {
    if (
      action === 'edit' &&
      image &&
      !image.includes('data:image/jpeg;base64,')
    ) {
      const getEditImage = async () => {
        const imageUrl = await downloadImage({
          token: (await getToken({ template: 'supabase' }))!,
          imagePath: image,
        });

        if (imageUrl) setValidImage(imageUrl);
      };

      getEditImage();
    } else if (image && image.includes('data:image/jpeg;base64,')) {
      setValidImage(image);
    } else {
      setValidImage('');
    }
    if (image && fadeAnim.value === 0) {
      fadeAnim.value = 1;
    }
  }, [image]);

  return (
    <View style={image && { gap: 20, paddingBottom: 40 }}>
      <AddFinanceButton onPress={pickImage} text="Pick a photo" icon="camera" />

      {/* TODO: Loader while image loads */}
      {validImage && (
        <Animated.View style={[styles.animatedView, animatedStyle]}>
          <View style={{ flex: 1 }}>
            <FinanceImage image={validImage} />
          </View>
          <Pressable
            onPress={() => {
              fadeAnim.value = withTiming(0, { duration: 500 }, () => {
                runOnJS(setField)('image', null);
              });
            }}
            style={styles.imageDeleteBtn}
          >
            <MaterialIcons name="delete" size={24} color="red" />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

export default PickImage;

const styles = StyleSheet.create({
  animatedView: { width: '100%', aspectRatio: 1 },
  image: { width: '100%', height: '100%' },
  imageDeleteBtn: { position: 'absolute', right: 10, top: 40 },
});
