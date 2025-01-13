import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import useHeaderActions from '../add-finance/hooks/useHeaderActions';
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
  // const { loading, onLeaveWithUnsavedChanges } = useHeaderActions();
  const { isFormDirty } = useFinanceForm();

  return (
    <TouchableOpacity
      onPress={isFormDirty() ? leaveWithUnsavedChanges : router.back}
      style={[
        {
          padding: 5,
          backgroundColor: COLORS.primary,
          borderRadius: '50%',
        },
        loading && { backgroundColor: COLORS.disabled },
      ]}
      disabled={loading}
    >
      <AntDesign name="close" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({});
