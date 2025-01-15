import { COLORS } from '@/constants/colors';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import { FinanceCategoryItem } from '@/types/types';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const FinanceSliderItem = ({
  item,
  categoryName,
  categoryType,
}: {
  item: FinanceCategoryItem;
  categoryName: string;
  categoryType: string;
}) => {
  const usableCategory = categoryName.toLowerCase().split(' ').join('_');
  const {
    financeForm: { kind },
    setField,
  } = useFinanceForm();
  return (
    <TouchableOpacity
      style={[{ alignItems: 'center' }]}
      onPress={() => {
        setField('kind', `${usableCategory}/${item.icon}`);
      }}
    >
      <Image
        source={
          categoryType === 'expense'
            ? EXPENSES_ICONS[usableCategory][item.icon]
            : INCOME_ICONS[usableCategory][item.icon]
        }
        style={[
          styles.btnImage,
          item.icon === kind.split('/')[1] && styles.btnImageSelected,
        ]}
      />
      <Text
        style={[
          { fontSize: 12, textAlign: 'center' },
          item.icon === kind.split('/')[1]
            ? { color: COLORS.selected, fontWeight: 600 }
            : { color: COLORS.text },
        ]}
        numberOfLines={item.name.split(' ').length}
      >
        {item.name.split(' ').map((word, index) => (
          <Text key={index}>
            {word}
            {'\n'}
          </Text>
        ))}
      </Text>
    </TouchableOpacity>
  );
};

export default FinanceSliderItem;

const styles = StyleSheet.create({
  btnImage: { width: 50, height: 50, marginBottom: 10 },
  btnImageSelected: {
    borderColor: COLORS.selected,
    borderWidth: 3,
    borderRadius: '50%',
  },
});
