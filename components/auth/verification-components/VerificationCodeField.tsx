import { StyleSheet } from 'react-native';
import React from 'react';
import VerificationCell from './VerificationCell';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { CELL_COUNT } from '@/constants/variables';

const VerificationCodeField = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete="one-time-code"
      testID="my-code-input"
      renderCell={(cellProps) => (
        <VerificationCell
          key={cellProps.index}
          {...cellProps}
          layoutHandler={getCellOnLayoutHandler}
        />
      )}
    />
  );
};

export default VerificationCodeField;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    gap: 5,
  },
});
