import { StyleSheet, Text } from 'react-native';

const DashboardBottomSheetListEmpty = () => {
  return (
    <Text style={styles.text}>No records of income/expenses on this day!</Text>
  );
};

export default DashboardBottomSheetListEmpty;

const styles = StyleSheet.create({
  text: { fontWeight: '700', alignSelf: 'center' },
});
