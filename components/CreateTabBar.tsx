import { StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const CreateTabBar = () => {
  return (
    <LinearGradient
      colors={['rgb(0, 136, 91)', 'rgb(71, 165, 134)', 'rgb(2, 117, 79)']}
      style={styles.buttonContainer}
    >
      <AntDesign name="plus" size={24} color="#fff" />
    </LinearGradient>
  );
};

export default CreateTabBar;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30, // Half of width and height to make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
