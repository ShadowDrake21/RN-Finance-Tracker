import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import { COLORS } from '@/constants/colors';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const HeaderLeft = ({
  leaveWithUnsavedChanges,
  loading,
}: {
  leaveWithUnsavedChanges: () => void;
  loading: boolean;
}) => {
  const router = useRouter();
  const { isFormDirty } = useFinanceForm();

  return (
    <TouchableOpacity
      onPress={isFormDirty() ? leaveWithUnsavedChanges : router.back}
      style={[
        styles.container,
        loading && { backgroundColor: COLORS.disabled },
      ]}
      disabled={loading}
    >
      <AntDesign name="close" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: '50%',
    backgroundColor: COLORS.primary,
  },
});
