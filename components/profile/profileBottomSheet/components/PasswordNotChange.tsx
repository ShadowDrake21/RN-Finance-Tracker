import React from 'react';
import CustomButton from '@/components/ui/CustomButton';
import { COLORS } from '@/constants/colors';

const PasswordNotChange = ({ onPress }: { onPress: () => void }) => {
  return (
    <CustomButton
      style={{ backgroundColor: COLORS.mainTint }}
      onPress={onPress}
    >
      Change Password
    </CustomButton>
  );
};

export default PasswordNotChange;
