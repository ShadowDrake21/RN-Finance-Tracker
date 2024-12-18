import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

type SocialButtonProps = {
  onPress: () => Promise<void>;
  icon: keyof typeof AntDesign.glyphMap;
  label: string;
};

const SocialButton = ({ onPress, icon, label }: SocialButtonProps) => {
  return (
    <TouchableOpacity style={styles.socialBtn} onPress={onPress}>
      <Text style={styles.socialText}>{label}</Text>
      <AntDesign name={icon} size={24} color="black" />
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    padding: 15,
    gap: 5,
  },
  socialText: { fontSize: 16, fontWeight: '600' },
});
