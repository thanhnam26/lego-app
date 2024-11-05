import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CheckoutScreen = ({ navigateToHome }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thanh toán thành công!</Text>
      <Button title="Quay về trang chủ" onPress={navigateToHome} color="#F40000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginBottom: 16,
  },
});

export default CheckoutScreen;
