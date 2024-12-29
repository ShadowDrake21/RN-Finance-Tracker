import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '@/constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import CurrencyInput from 'react-native-currency-input';
import { currencies } from '@/content/currencies.content';

const SumInput = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const [sum, setSum] = useState<number | null>(null);
  const [value, setValue] = useState<string>('pln');
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
        style,
      ]}
    >
      <CurrencyInput
        value={sum}
        onChangeValue={(value) => setSum(value ?? 0)}
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        onChangeText={(formattedValue) => {
          console.log(formattedValue);
        }}
        placeholder="40,90"
        placeholderTextColor={COLORS.gray}
        style={{
          fontSize: 32,
          color: 'black',
          fontWeight: '700',
          width: 150,
        }}
      />
      <View>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={currencies}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    </View>
  );
};

export default SumInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'transparent',

    width: 130,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 32,
    color: COLORS.darkGray,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
