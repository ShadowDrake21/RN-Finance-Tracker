import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'pinar';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { format } from 'date-fns';
import { Stack, useLocalSearchParams } from 'expo-router';
import FinanceSlider from '@/components/finances/add-finance/finance-slider/FinanceSlider';
import CalendarModal from '@/components/finances/add-finance/CalendarModal';
import SumInput from '@/components/finances/add-finance/SumInput';
import TypeSwitch from '@/components/finances/add-finance/TypeSwitch';
import AddFinanceButton from '@/components/finances/add-finance/AddFinanceButton';
import PickImage from '@/components/finances/add-finance/PickImage';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import useHeaderActions from '@/components/finances/add-finance/hooks/useHeaderActions';
import Loader from '@/components/shared/Loader';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { getFinanceById } from '@/supabase/supabase.requests';
import { FinanceFormType, Finances } from '@/types/types';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const carouselRef = useRef<Carousel | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { financeForm, setField, setForm } = useFinanceForm();
  const { headerLeft, headerRight, loading } = useHeaderActions();
  const { user } = useUser();
  const { userId, getToken } = useAuth();

  const [fetchedEditFinance, setFetchedEditFinance] = useState<Finances | null>(
    null
  );
  const { id, type } = useLocalSearchParams();

  useEffect(() => {
    console.log('id', id);
    console.log('type', type);

    const fethEditFinance = async () => {
      if (!id && type === 'create') {
        console.log('create');
      }
      if (id && type === 'edit') {
        const token = await getToken({ template: 'supabase' });
        console.log('token', token);

        if (!userId || !token) return;

        const finance = (
          (await getFinanceById({
            userId,
            token,
            finance_id: +id,
          })) as unknown[]
        )[0] as Finances;

        setFetchedEditFinance(finance);
      }
    };

    fethEditFinance();
    setFetchedEditFinance(null);
  }, [id, type]);

  useEffect(() => {
    if (fetchedEditFinance) {
      setForm({
        ...fetchedEditFinance,
        sum: fetchedEditFinance.price,
        note: fetchedEditFinance.name,
        kind: fetchedEditFinance.icon_type,
        date: new Date(fetchedEditFinance.date).toISOString(),
        action: 'edit',
      });
    }
  }, [fetchedEditFinance]);

  if (loading) return <Loader />;

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerLeft: headerLeft,
          headerRight: headerRight,
        }}
      />
      <>
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
                text={format(new Date(financeForm.date), 'd MMM yyyy')}
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
      </>
    </ScrollView>
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
