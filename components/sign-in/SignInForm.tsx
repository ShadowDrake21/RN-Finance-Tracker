import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EMAIL_REGEX } from '@/utils/forms.utils';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import CustomTextInput from '../ui/CustomTextInput';
import FormError from '../ui/FormError';
import { SignInFormType } from '@/types/types';

const SignInForm = ({
  control,
  errors,
}: {
  control: Control<SignInFormType, any>;
  errors: FieldErrors<SignInFormType>;
}) => {
  return (
    <View style={{ gap: 15, marginBottom: 20 }}>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: EMAIL_REGEX,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            placeholder="Email"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && (
        <>
          {errors.email.type === 'required' && (
            <FormError>Email is required.</FormError>
          )}
          {errors.email.type === 'pattern' && (
            <FormError>This is not a valid email address.</FormError>
          )}
        </>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            placeholder="Password"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && (
        <>
          {errors.password.type === 'required' && (
            <FormError>Password is required.</FormError>
          )}
        </>
      )}
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({});
