import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
} from 'react-hook-form';
import CustomTextInput from '../ui/CustomTextInput';
import FormError from '../ui/FormError';
import { SignUpFormType } from '@/types/types';

const SignUpForm = ({
  control,
  errors,
  getValues,
}: {
  control: Control<SignUpFormType, any>;
  errors: FieldErrors<SignUpFormType>;
  getValues: UseFormGetValues<SignUpFormType>;
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 50,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            placeholder="Name"
            onChangeText={onChange}
            autoCapitalize="words"
            value={value}
            onBlur={onBlur}
          />
        )}
        name="name"
      />
      {errors.name && (
        <>
          {errors.name.type === 'required' && (
            <FormError>Name is required.</FormError>
          )}
          {errors.name.type === 'maxLength' && (
            <FormError>Name cannot be longer than 50 characters.</FormError>
          )}
        </>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
          minLength: 8,
          maxLength: 25,
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
          {errors.password.type === 'minLength' && (
            <FormError>Password must be at least 8 characters long.</FormError>
          )}
          {errors.password.type === 'maxLength' && (
            <FormError>Password cannot be longer than 25 characters.</FormError>
          )}
        </>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          validate: (value) => {
            return value === getValues('password') || 'Passwords do not match.';
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            placeholder="Confirm Password"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            secureTextEntry={true}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <>
          {errors.confirmPassword.type === 'required' && (
            <FormError>Confirm Password is required.</FormError>
          )}
          {errors.confirmPassword.type === 'validate' && (
            <FormError>{errors.confirmPassword.message!}</FormError>
          )}
        </>
      )}
    </>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});
