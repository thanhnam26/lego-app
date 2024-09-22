import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CartScreen = ({ navigateToHome, navigateToCheckout }) => {
  const cart = useSelector(state => state.cart);

  const renderItem = ({ item }) => (
    <Text style={styles.cartItem}>{item.name} - ${item.price}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ hàng của bạn</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <Button title="Tiến hành thanh toán" onPress={navigateToCheckout} color="#F40000" />
      <Button title="Quay lại" onPress={navigateToHome} color="#F40000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
  },
  cartItem: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
});

export default CartScreen;
