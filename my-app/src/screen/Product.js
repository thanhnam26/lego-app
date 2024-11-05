import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../constant/color";
import { fontSize, spacing } from "../constant/demention";
import { fontFamily } from "../constant/font";

const Product = ({ products, handleAddToCart }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          productId: products._id,
          handleAddToCart,
          categoryId: products.category_id
        })
      }
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: products.images[0] }} style={styles.productImage} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {products.name}
        </Text>
        <Text style={styles.price}>
          {products.price
            ? `${products.price.toLocaleString()} VND`
            : "Loading..."}
        </Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.detailText}>Xem chi tiết</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(products)}
          >
            <FontAwesome name="cart-plus" size={20} color={colors.purple} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    elevation: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginVertical: 7,
    marginHorizontal: 4,
    overflow: "hidden",
    
  },
  imageWrapper: {
    borderRadius: 13,
    backgroundColor: "#5B41FF",
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 180,
    
  },
  productImage: {
    borderRadius: 12,
    height: 180,
    width: "100%",
    resizeMode: "repeat",
  },
  contentContainer: {
    padding: spacing.md,
  },
  name: {
    color: colors.black,
    fontSize: fontSize.md,
    fontFamily: fontFamily.SemiBold,
    height: 40,
  },
  price: {
    color: colors.purple,
    fontSize: fontSize.md,
    fontFamily: fontFamily.Medium,
    marginTop: spacing.sm,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  detailText: {
    color: colors.black,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.Medium,
    
  },
  addButton: {
    padding: spacing.xs,
  },
});

export default Product;