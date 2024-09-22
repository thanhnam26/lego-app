import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/(tabs)/redux/action';

const ProductDetailScreen = ({ product, navigateToHome }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigateToHome();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>Tên sản phẩm: {product.name}</Text>
      <Text style={styles.productPrice}>Giá: ${product.price}</Text>
      <Button title="Thêm vào giỏ" onPress={handleAddToCart} color="#F40000" />
      <Button title="Quay lại" onPress={navigateToHome} color="#F40000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
});

export default ProductDetailScreen;
