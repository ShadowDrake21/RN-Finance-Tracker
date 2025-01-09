import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FinanceItemError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Unexpected error!</Text>
    </View>
  );
};

export default FinanceItemError;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 600 },
});
