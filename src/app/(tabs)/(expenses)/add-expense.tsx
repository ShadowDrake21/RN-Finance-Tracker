import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import SumInput from '@/components/add-expense/SumInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomSwitch from '@/components/ui/CustomSwitch';

const Page = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, paddingBottom: bottom, paddingHorizontal: 20 }}>
        <SumInput />
        <CustomSwitch
          onPress={() => console.log('switch')}
          value={true}
          props={{ activeText: 'On', inActiveText: 'Off' }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Page;

const styles = StyleSheet.create({});
