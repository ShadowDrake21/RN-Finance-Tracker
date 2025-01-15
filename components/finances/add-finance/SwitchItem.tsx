import { COLORS } from '@/constants/colors';
import { TypeSwitchProps } from '@/types/types';
import { Pressable, StyleSheet, Text } from 'react-native';

const SwitchItem = ({
  type,
  setField,
  isActive,
}: TypeSwitchProps & { isActive: boolean }) => (
  <Pressable
    onPress={() => setField('type', type)}
    style={[
      styles.switchContainer,
      isActive && {
        backgroundColor: COLORS.darkPrimary,
      },
    ]}
  >
    <Text
      style={[
        styles.switchText,
        isActive
          ? { color: COLORS.lightGray }
          : { color: COLORS.extraDarkPrimary },
      ]}
    >
      {type}
    </Text>
  </Pressable>
);

export default SwitchItem;

const styles = StyleSheet.create({
  switchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  switchText: { textTransform: 'uppercase', width: '100%', fontWeight: '700' },
});
