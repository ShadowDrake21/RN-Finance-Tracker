import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'pinar';
import CustomTextInput from '@/components/ui/CustomTextInput';

import { format } from 'date-fns';

import { Stack } from 'expo-router';
import ReloadBtn from '@/components/finances/ReloadBtn';
import FinanceSlider from '@/components/finances/add-finance/finance-slider/FinanceSlider';

import CalendarModal from '@/components/finances/add-finance/CalendarModal';
import SumInput from '@/components/finances/add-finance/SumInput';
import TypeSwitch from '@/components/finances/add-finance/TypeSwitch';
import AddFinanceButton from '@/components/finances/add-finance/AddFinanceButton';
import PickImage from '@/components/finances/add-finance/PickImage';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const carouselRef = useRef<Carousel | null>(null);
  const [note, setNote] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const resetData = () => {
    setType('expense');
    setNote('');
    setImage(null);
    setDate(new Date().toISOString());
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <ReloadBtn onReload={resetData} />,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <View style={[styles.container, { paddingBottom: bottom }]}>
            <SumInput style={{ paddingBottom: 20 }} />
            <TypeSwitch type={type} setType={setType} />
            <FinanceSlider type={type} carouselRef={carouselRef} />
            <View style={styles.dataContainer}>
              <CustomTextInput
                placeholder="Note"
                onChangeText={setNote}
                value={note}
              />
              <PickImage image={image} setImage={setImage} />
              <AddFinanceButton
                onPress={() => {
                  setIsModalVisible((prev) => !prev);
                }}
                text={format(date, 'd MMM yyyy')}
                icon="calendar"
              />
            </View>
            <CalendarModal
              visible={isModalVisible}
              setVisible={setIsModalVisible}
              date={date}
              setDate={setDate}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  dataContainer: { paddingVertical: 20, gap: 20, flex: 1 },
});
