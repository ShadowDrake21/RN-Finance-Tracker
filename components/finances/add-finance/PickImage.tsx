import { Image, Pressable, StyleSheet, View } from 'react-native';
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
import FinanceItemImage from '@/components/finance-info/FinanceItemImage';

const PickImage = () => {
  const {
    financeForm: { image },
    setField,
  } = useFinanceForm();

  const { userId, getToken } = useAuth();
  const [downloadedImage, setDownloadedImage] = useState('');

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
      setField('image', `data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  useEffect(() => {
    console.log('image data:image/jpeg;base64,', image);

    if (image && !image?.includes('data:image/jpeg;base64,')) {
      console.log('not base64');

      const getEditImage = async () => {
        const imageUrl = await downloadImage({
          user_id: userId!,
          token: (await getToken({ template: 'supabase' }))!,
          imagePath: image,
        });

        if (imageUrl) setDownloadedImage(imageUrl);
      };

      getEditImage();
    }
    if (image && fadeAnim.value === 0) {
      fadeAnim.value = 1;
    }
  }, [image]);

  // TODO: add a type to each finance: edit or create to recognise images
  return (
    <View style={{ paddingBottom: 50 }}>
      <AddFinanceButton onPress={pickImage} text="Pick a photo" icon="camera" />

      {image && (
        <Animated.View
          style={[styles.animatedView, animatedStyle, { paddingTop: 20 }]}
        >
          {/* <Image
            source={{ uri: downloadedImage ?? image }}
            style={[styles.image]}
            resizeMode="cover"
          /> */}
          <View style={{ flex: 1 }}>
            <FinanceItemImage image={downloadedImage ?? image} />
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
  imageDeleteBtn: { position: 'absolute', right: 10, top: 10 },
});
