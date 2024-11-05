import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Item = ({ title, price, imageUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.productCard}>
      <Image source={imageUrl } style={styles.productImage} />
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productPrice}>{price}</Text>
      <FontAwesome5
        name="cart-plus"
        size={15}
        color="black"
        style={styles.addCart}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: "48%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 4,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 12,
    color: "#666",
  },
  addCart: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
});

export default Item;
