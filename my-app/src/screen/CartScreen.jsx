import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity,clearPurchasedItems } from "../redux/action";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../constant/color";
import API from "../networking/ApiClient"
const backgroundImage = require("../assets/img/bgr.jpg");

const CartScreen = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  // Trạng thái để theo dõi sản phẩm đã chọn
  const [selectedItems, setSelectedItems] = useState({});

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity(id, newQuantity));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Đảo ngược trạng thái đã chọn
    }));
  };

  const calculateTotal = () => {
    let selectedTotal = 0;
    Object.keys(selectedItems).forEach((id) => {
      if (selectedItems[id]) {
        const item = items.find((i) => i._id === id);
        if (item) {
          selectedTotal += item.price * item.quantity;
        }
      }
    });
    return selectedTotal;
  };

  const selectedTotal = calculateTotal();

  const handleCheckout = async () => {
    const productList = Object.keys(selectedItems).map(id => {
      if (selectedItems[id]) {
        const item = items.find((i) => i._id === id);
        if (item) { // Kiểm tra item có tồn tại không
          return {
            productId: id,
            nameP: item.name,
            quantityP: item.quantity,
            priceP: item.price,
            total: item.price * item.quantity,
          };
        }
      }
      return null;
    }).filter(item => item !== null);
  
    // Kiểm tra nếu có sản phẩm nào để thanh toán
    if (productList.length === 0) {
      Alert.alert("Chưa có sản phẩm nào được chọn để thanh toán!");
      return;
    }
  
    const total_cost = productList.reduce((sum, item) => sum + item.total, 0);
  
    const billData = {
      total_cost: total_cost,
      payment: "Tiền mặt khi nhận hàng",
      discount: 0,
      product_list: productList,
    };
  
    try {
      const response = await API.apiCreateBill(billData);
      Alert.alert("Hóa đơn đã được tạo thành công!", `Mã hóa đơn: ${response.data._id}`, "Sản phẩm của bạn sẽ được giao trong 2-3 ngày tới");
  
      // Xóa sản phẩm khỏi giỏ hàng
      productList.forEach(item => {
        dispatch(removeFromCart(item.productId));
      });
  
      // Có thể điều hướng đến trang khác hoặc cập nhật trạng thái giỏ hàng
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };
  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cartItem}
      onPress={() => handleSelectItem(item._id)}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>{item.price.toLocaleString()} VND</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item._id, item.quantity - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item._id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item._id))}
        style={styles.removeButton}
      >
        <FontAwesome name="trash" size={24} color={colors.purple} />
      </TouchableOpacity>
      {/* Hiển thị trạng thái đã chọn */}
      {selectedItems[item._id] && (
        <FontAwesome name="check-circle" size={24} color={colors.green} />
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
       <View style={styles.container}>
      <Text style={styles.header}>Giỏ hàng của bạn</Text>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.containerPay}>
            <Text style={styles.textPay}>Thanh toán:</Text>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Giá sản phẩm đã chọn:</Text>
              <Text style={styles.totalAmount}>
                {selectedTotal.toLocaleString()} VND
              </Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Phí giao hàng:</Text>
              <Text style={styles.totalAmount}>
                Miễn phí
              </Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Tổng cộng:</Text>
              <Text style={styles.totalAmount}>
                {(selectedTotal).toLocaleString()} VND
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <FontAwesome name="shopping-cart" size={64} color={colors.purple} />
          <Text style={styles.emptyText}>Giỏ hàng trống</Text>
        </View>
      )}
    </View>
    </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    
  },
  container: {
   flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.purple,
  },
  listContent: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.purple,
    fontWeight: "bold",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: colors.purple,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  removeButton: {
    padding: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  containerPay:{},
textPay:{
  fontSize: 20,
  fontWeight: "500",
  fontStyle:"normal"
},
  totalText: {
    fontSize: 12,
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.purple,
  },
  checkoutButton: {
    backgroundColor: colors.purple,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 50,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
  },
});

export default CartScreen;
