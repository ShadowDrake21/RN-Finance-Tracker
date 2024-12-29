import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import SumInput from '@/components/add-finance/SumInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TypeSwitch from '@/components/add-finance/TypeSwitch';

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const [type, setType] = useState<'expense' | 'income'>('expense');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          paddingBottom: bottom,
          paddingHorizontal: 20,
          paddingTop: 15,
        }}
      >
        <SumInput style={{ paddingBottom: 30 }} />
        <TypeSwitch type={type} setType={setType} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Page;

const styles = StyleSheet.create({});
