import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import AddFinanceButton from '../finances/add-finance/AddFinanceButton';
import CalendarModal from '../finances/add-finance/CalendarModal';
import FinanceSlider from '../finances/add-finance/finance-slider/FinanceSlider';
import PickImage from '../finances/add-finance/PickImage';
import SumInput from '../finances/add-finance/SumInput';
import TypeSwitch from '../finances/add-finance/TypeSwitch';
import CustomTextInput from '../ui/CustomTextInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'pinar';
import { FinanceFormType } from '@/types/types';

const FinanceForm = ({
  financeForm,
  setField,
}: {
  financeForm: FinanceFormType;
  setField: (field: keyof FinanceFormType, value: any) => void;
}) => {
  const { bottom } = useSafeAreaInsets();
  const carouselRef = useRef<Carousel | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
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
              text={format(new Date(financeForm.date), 'd MMM yyyy')}
              icon="calendar"
            />
          </View>
          <CalendarModal
            visible={isModalVisible}
            setVisible={setIsModalVisible}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default FinanceForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  dataContainer: { paddingVertical: 20, gap: 20, flex: 1 },
});
