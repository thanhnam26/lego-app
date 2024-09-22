import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigateToDetail, navigateToCart }) => {
  const products = [
    { id: '1', name: 'LEGO Star Wars', price: 100 },
    { id: '2', name: 'LEGO City', price: 80 },
    // Add more products...
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigateToDetail(item)}>
      <Text style={styles.productText}>{item.name} - ${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách sản phẩm LEGO</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <Button title="Xem giỏ hàng" onPress={navigateToCart} color="#F40000" />
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
  productItem: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
  },
  productText: {
    color: '#F40000',
    fontSize: 16,
  },
});

export default HomeScreen;
