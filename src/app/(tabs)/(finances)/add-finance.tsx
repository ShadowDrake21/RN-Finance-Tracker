import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'pinar';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { format, set } from 'date-fns';
import { Stack, useRouter } from 'expo-router';
import ReloadBtn from '@/components/finances/ReloadBtn';
import FinanceSlider from '@/components/finances/add-finance/finance-slider/FinanceSlider';
import CalendarModal from '@/components/finances/add-finance/CalendarModal';
import SumInput from '@/components/finances/add-finance/SumInput';
import TypeSwitch from '@/components/finances/add-finance/TypeSwitch';
import AddFinanceButton from '@/components/finances/add-finance/AddFinanceButton';
import PickImage from '@/components/finances/add-finance/PickImage';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import SaveBtn from '@/components/finances/SaveBtn';
import { COLORS } from '@/constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import useHeaderActions from '@/components/finances/add-finance/hooks/useHeaderActions';

import { useAuth, useUser } from '@clerk/clerk-expo';
import { addFinance } from '@/supabase/supabase.requests';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const carouselRef = useRef<Carousel | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { financeForm, setField } = useFinanceForm();
  const { headerLeft, headerRight } = useHeaderActions();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: headerRight,
          headerLeft: headerLeft,
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
