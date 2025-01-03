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
import FinanceSlider from '@/components/finances/add-finance/finance-slider/FinanceSlider';
import CalendarModal from '@/components/finances/add-finance/CalendarModal';
import SumInput from '@/components/finances/add-finance/SumInput';
import TypeSwitch from '@/components/finances/add-finance/TypeSwitch';
import AddFinanceButton from '@/components/finances/add-finance/AddFinanceButton';
import PickImage from '@/components/finances/add-finance/PickImage';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import useHeaderActions from '@/components/finances/add-finance/hooks/useHeaderActions';
import Loader from '@/components/shared/Loader';
import { useUser } from '@clerk/clerk-expo';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const carouselRef = useRef<Carousel | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { financeForm, setField } = useFinanceForm();
  const { headerLeft, headerRight, loading } = useHeaderActions();
  const { user } = useUser();

  if (loading) return <Loader />;

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: headerLeft,
          headerRight: headerRight,
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
            <TypeSwitch />
            <FinanceSlider carouselRef={carouselRef} />
            <View style={styles.dataContainer}>
              <CustomTextInput
                placeholder="Note"
                onChangeText={(value) => setField('note', value)}
                value={financeForm.note}
              />
              <PickImage />
              <AddFinanceButton
                onPress={() => {
                  setIsModalVisible((prev) => !prev);
                }}
                text={format(financeForm.date, 'd MMM yyyy')}
                icon="calendar"
              />
            </View>
            <CalendarModal
              visible={isModalVisible}
              setVisible={setIsModalVisible}
              firstDate={user?.createdAt || new Date()}
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
