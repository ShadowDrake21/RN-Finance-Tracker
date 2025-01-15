import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const EditingButtons = () => {
  const { setIsEditing, resetField, saveName } = useProfileEdit();
  return (
    <View style={styles.isEditingContainer}>
      <TouchableOpacity
        onPress={() => {
          setIsEditing((prev) => !prev);
          resetField('name');
        }}
      >
        <MaterialCommunityIcons name="cancel" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          saveName();
          setIsEditing((prev) => !prev);
        }}
      >
        <Entypo name="save" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default EditingButtons;

const styles = StyleSheet.create({
  isEditingContainer: { gap: 10, flexDirection: 'row' },
});
