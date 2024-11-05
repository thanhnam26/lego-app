
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Home from "../screen/Home";
import Profile from "../screen/Profile";
import CartScreen from "../screen/CartScreen";
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux'; 

const Tab = createBottomTabNavigator();

const TabBar = () => {
  const cartItems = useSelector((state) => state.cart.items) ?? []; 
  const uniqueProductCount = cartItems.length 
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarShowLabel: false, // Bỏ nhãn để có không gian cho icon
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabItem, focused ? styles.tabItemFocused : null]}>
            <Ionicons name="home" size={focused ? 28 : 22} color={focused ? '#5B41FF' : '#000'} />
            <Text style={[styles.tabLabel, focused ? styles.tabLabelFocused : null]}>Home</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabItem, focused ? styles.tabItemFocused : null]}>
            <Ionicons name="cart" size={focused ?  28 : 22} color={focused ? '#5B41FF' : '#000'} />
            <Text style={[styles.tabLabel, focused ? styles.tabLabelFocused : null]}>Cart</Text>
            <View style={styles.cartBadge}>
                  <Text style={styles.badgeText}>{uniqueProductCount}</Text>
                </View>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabItem, focused ? styles.tabItemFocused : null]}>
            <Ionicons name="person" size={focused ? 28 : 22} color={focused ? '#5B41FF' : '#000'} />
            <Text style={[styles.tabLabel, focused ? styles.tabLabelFocused : null]}>Profile</Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
  )
}

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 10,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginHorizontal: 50,
       paddingVertical: 10,
      
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    height:50
  },
  tabItemFocused: {
    transform: [{ scale: 1 }], // Phóng to tab khi được chọn
  },
  tabLabel: {
    fontSize: 12,
    color: '#000', // Mặc định màu đen
  },
  tabLabelFocused: {
    color: '#5B41FF', // Màu khi được chọn
    fontWeight: 'bold',
  },
  cartBadge: {
    position: 'absolute',
    right: -10, // Điều chỉnh vị trí badge
    top: -5, // Điều chỉnh vị trí theo chiều dọc
    backgroundColor: '#ff4d4d', // Màu nền giống Shopee
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff', // Viền trắng
    borderWidth: 1, // Đường viền
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold', // Đậm hơn để dễ đọc
  },
});
