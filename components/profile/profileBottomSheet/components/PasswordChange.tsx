import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomButton from '@/components/ui/CustomButton';
import { COLORS } from '@/constants/colors';
import useUpdateUser from '@/hooks/useUpdateUser';
import { useProfileEdit } from '@/contexts/ProfileEditContext';

const PasswordChange = () => {
  const { password, setPassword, setIsPasswordChange } = useProfileEdit();
  const { onChangePassword } = useUpdateUser();

  return (
    <View style={styles.passwordChangeWrapper}>
      <CustomTextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        propStyles={{ flex: 1 }}
      />
      <CustomButton
        style={{
          width: 100,
          backgroundColor: COLORS.darkPrimary,
        }}
        onPress={onChangePassword}
      >
        Save
      </CustomButton>
      <CustomButton
        style={{ width: 100, backgroundColor: 'black' }}
        onPress={() => setIsPasswordChange(false)}
      >
        Cancel
      </CustomButton>
    </View>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({
  passwordChangeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
