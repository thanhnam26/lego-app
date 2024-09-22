import React from 'react';
import { View, StyleSheet } from 'react-native';
import Home from "../(tabs)/screen/Home";
import ProductDetail from '@/app/(tabs)/screen/ProductDetail';
import CartScreen from '@/app/(tabs)/screen/CartScreen';
import CheckoutScreen from '@/app/(tabs)/screen/CheckoutScreen';
import { Provider } from 'react-redux';
import store from '@/app/(tabs)/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      {/* Chỉ có một NavigationContainer duy nhất */}
      <NavigationContainer independent={true}>
        <Stack.Navigator 
          screenOptions={{
            headerStyle: { backgroundColor: '#F40000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ title: 'Trang Chủ LEGO' }} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Chi Tiết Sản Phẩm' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ Hàng' }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Thanh Toán' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F40000', // Màu đỏ chủ đạo giống LEGO
  },
});
