import * as ImagePicker from 'expo-image-picker';

const usePickImage = () => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      return `data:image/jpeg;base64,${result.assets[0].base64}`;
    }
  };

  return { pickImage };
};

export default usePickImage;
