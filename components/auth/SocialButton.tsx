import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSocialAuth } from '@/hooks/useSocialAuth';

type SocialButtonProps = {
  type: 'google' | 'apple';
  icon: keyof typeof AntDesign.glyphMap;
  label: string;
  style?: object;
  textStyle?: object;
  setLoading: (a: boolean) => void;
};

const SocialButton = ({
  type,
  icon,
  label,
  style,
  textStyle,
  setLoading,
}: SocialButtonProps) => {
  const { onSocialAuth } = useSocialAuth();

  return (
    <TouchableOpacity
      style={[styles.socialBtn, style]}
      onPress={() => onSocialAuth({ type, setLoading })}
      accessibilityLabel={`Sign in with ${label}`}
    >
      <Text style={[styles.socialText, textStyle]}>{label}</Text>
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
