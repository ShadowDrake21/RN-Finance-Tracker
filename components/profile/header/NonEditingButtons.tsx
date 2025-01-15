import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';

const NonEditingButtons = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="edit" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default NonEditingButtons;

const styles = StyleSheet.create({});
