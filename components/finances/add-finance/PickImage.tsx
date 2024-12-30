import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  withTiming,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import AddFinanceButton from './AddFinanceButton';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const PickImage = ({
  image,
  setImage,
}: {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
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
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (image && fadeAnim.value === 0) {
      fadeAnim.value = 1;
    }
  }, [image]);
  return (
    <>
      <AddFinanceButton onPress={pickImage} text="Pick a photo" icon="camera" />

      {image && (
        <Animated.View style={[styles.animatedView, animatedStyle]}>
          <Image
            source={{ uri: image }}
            style={[styles.image]}
            resizeMode="cover"
          />
          <Pressable
            onPress={() => {
              fadeAnim.value = withTiming(0, { duration: 500 }, () => {
                runOnJS(setImage)(null);
              });
            }}
            style={styles.imageDeleteBtn}
          >
            <MaterialIcons name="delete" size={24} color="red" />
          </Pressable>
        </Animated.View>
      )}
    </>
  );
};

export default PickImage;

const styles = StyleSheet.create({
  animatedView: { width: '100%', height: 150 },
  image: { width: '100%', height: '100%' },
  imageDeleteBtn: { position: 'absolute', right: 10, top: 10 },
});
