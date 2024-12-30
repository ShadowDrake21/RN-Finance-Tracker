import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@/constants/colors';
import { DefaultTheme } from '@react-navigation/native';

const AddFinanceButton = ({
  onPress,
  icon,
  text,
}: {
  onPress: () => void;
  icon: keyof typeof AntDesign.glyphMap;
  text: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonIconWrapper}>
          <AntDesign name={icon} size={24} color={COLORS.extraDarkPrimary} />
        </View>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
      <AntDesign name="plus" size={24} color={COLORS.extraDarkPrimary} />
    </TouchableOpacity>
  );
};

export default AddFinanceButton;

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
  buttonWrapper: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  buttonIconWrapper: {
    backgroundColor: COLORS.lightPrimary,
    padding: 15,
    borderRadius: 50,
  },
});
