import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import SumInput from '@/components/add-finance/SumInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TypeSwitch from '@/components/add-finance/TypeSwitch';
import FinanceSlider from '@/components/add-finance/finance-slider/FinanceSlider';
import Carousel from 'pinar';
import CustomTextInput from '@/components/ui/CustomTextInput';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '@/constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DefaultTheme } from '@react-navigation/native';
import AddFinanceButton from '@/components/add-finance/AddFinanceButton';
import { format } from 'date-fns';
import CalendarModal from '@/components/add-finance/CalendarModal';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const carouselRef = useRef<Carousel | null>(null);
  const [note, setNote] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      console.log('image', image);
    }
  };
  // image after the deletion does not work
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            paddingBottom: bottom,
            paddingHorizontal: 20,
            paddingTop: 15,
          }}
        >
          <SumInput style={{ paddingBottom: 20 }} />
          <TypeSwitch type={type} setType={setType} />
          <FinanceSlider type={type} carouselRef={carouselRef} />
          <View style={{ paddingVertical: 20, gap: 20, flex: 1 }}>
            <CustomTextInput
              placeholder="Note"
              onChangeText={setNote}
              value={note}
            />
            <AddFinanceButton
              onPress={pickImage}
              text="Pick a photo"
              icon="camera"
            />

            {image && (
              <Animated.View
                style={[{ width: '100%', height: 150 }, animatedStyle]}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: 150 }}
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => {
                    // Start fade out animation
                    fadeAnim.value = withTiming(0, { duration: 500 }, () => {
                      runOnJS(setImage)(null);
                    });
                  }}
                  style={{ position: 'absolute', right: 10, top: 10 }}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </Pressable>
              </Animated.View>
            )}
            <AddFinanceButton
              onPress={() => setIsModalVisible((prev) => !prev)}
              text={format(date, 'd MMM yyyy')}
              icon="calendar"
            />
          </View>
          <CalendarModal
            visible={isModalVisible}
            date={date}
            setDate={setDate}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DefaultTheme.colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,

    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
