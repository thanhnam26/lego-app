import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/action";
import API from "../networking/ApiClient";
import { Entypo } from "@expo/vector-icons";

import Footer from "../components/Footer";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const ProductDetail = () => {
  const route = useRoute();
  const { productId, categoryId } = route.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [productRela, setProductRela] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const items = [
    "Hàng chính hãng",
    "Miễn phí giao hàng toàn quốc đơn trên 500k",
    "Giao hàng hỏa tốc 4 tiếng",
  ];

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await API.apiGetProductDetail(productId);
        setProduct(response.data);
        const responseRela = await API.apiGetProductsByCategory(categoryId);
        setProductRela(responseRela.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const handleAddToCartClick = () => {
    if (product && quantity >0) {
      const productToAdd = {
        ...product,
        quantity: quantity, 
      };
      dispatch(addToCart(productToAdd));
      setQuantity(1); 
    }
  };
  
  const handleRelatedProductPress = (product) => {
    navigation.navigate("ProductDetail", {
      productId: product._id,
      categoryId: product.category_id,
    });
    // Cuộn lên đầu trang
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  const productInfoItems = product.productInfo || [];
  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <View style={styles.productInfo}>
        <View style={styles.imageContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {product.images?.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={styles.productImage}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.starRating}>
          {[...Array(5)].map((_, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={16}
              color={index < 4 ? "#ffcc00" : "#ccc"}
            />
          ))}
        </View>
        <Text style={styles.productTitle}>{product.name || "Loading..."}</Text>
        <View style={styles.brandContainer}>
          <Text style={styles.labelText}>Thương hiệu:</Text>
          <Text style={styles.productCategory}>
            {product.category || "Unknown"}
          </Text>
        </View>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.labelText}>Giá bán: </Text>
        <Text style={styles.productPrice}>
          {product.price ? product.price.toLocaleString() : "Loading..."} VND
        </Text>
      </View>
      <View style={styles.benefitsContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Entypo name="check" size={20} color="#5B41FF" />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
      <View>
        <Text style={styles.textQuantity}>Số lượng</Text>
        <View style={styles.qtyBox}>
          <View style={styles.quantityInput}>
            <Button title="Thêm" color="#5B41FF" />
            <TextInput
        style={styles.quantityInputField}
        keyboardType="numeric"
        value={String(quantity)} // Chuyển số lượng thành chuỗi để hiển thị
        onChangeText={(text) => {
          const num = Math.max(1, Number(text) || 1); // Chỉ cho phép nhập số dương
          setQuantity(num);
        }}
      />
            <Button title="Sản phẩm" color="#5B41FF" />
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCartClick}
        >
          <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productDetailsContainer}>
        <View style={styles.productInfoTable}>
          {productInfoItems.length > 0 ? (
            productInfoItems
              .slice(0, isExpanded ? productInfoItems.length : 2)
              .map((item, index) => (
                <View style={styles.productInfoRow} key={item.id || index}>
                  <View
                    style={[
                      styles.productInfoColumn,
                      styles.productInfoColumnTitle,
                    ]}
                  >
                    <Text style={styles.productInfoTitle}>Xuất xứ</Text>
                    <Text style={styles.productInfoTitle}>Độ tuổi</Text>
                    <Text style={styles.productInfoTitle}>
                      Xuất xứ thương hiệu
                    </Text>
                    <Text style={styles.productInfoTitle}>Giới tính</Text>
                  </View>
                  <View
                    style={[
                      styles.productInfoColumn,
                      styles.productInfoColumnContent,
                    ]}
                  >
                    <Text style={styles.productInfoContent}>{item.origin}</Text>
                    <Text style={styles.productInfoContent}>
                      {item.ageUse} tuổi trở lên
                    </Text>
                    <Text style={styles.productInfoContent}>
                      {item.brand_origin}
                    </Text>
                    <Text style={styles.productInfoContent}>
                      {item.gender ? "Con trai" : "Con gái"}
                    </Text>
                  </View>
                </View>
              ))
          ) : (
            <Text style={styles.noInfoText}>Không có thông tin sản phẩm.</Text>
          )}
          {/* <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.toggleReadMoreButton}>
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.productDescription}>
        <Text style={styles.descriptionTitle}>*Mô tả sản phẩm:</Text>
        <Text style={styles.descriptionTitle}>
          {product.description?.title || "Loading..."}
        </Text>
        <Text style={styles.descriptionContent}>
          {product.description?.content || "Loading..."}
        </Text>
        <Text style={styles.descriptionNote}>
          {product.description?.note || "Loading..."}
        </Text>
      </View>
      <Text style={styles.textRela}>
        Sản phẩm liên quan({productRela.length})
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {productRela.map((product, index) => (
          <TouchableOpacity
            key={index} // Thêm key ở đây
            onPress={() => handleRelatedProductPress(product)}
          >
            <View key={index} style={styles.relatedProductContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: product.images[0] }}
                  style={styles.productImageRe}
                />
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.name} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.price}>
                  {product.price
                    ? `${product.price.toLocaleString()} VND`
                    : "Loading..."}
                </Text>
                <View style={styles.bottomContainer}>
                  <Text style={styles.detailText}>Xem chi tiết</Text>
                  <AntDesign name="heart" color="#5B41FF" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textRela: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  textQuantity: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
  },
  productInfo: {
    marginTop: 16,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    fontSize: 14,
    color: "#000",
  },
  productTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 4,
    lineHeight: 24,
    fontStyle: "normal",
    textTransform: "capitalize",
    color: "#111",
  },
  productCategory: {
    fontSize: 14,
    color: "#041675",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 20,
    textDecorationLine: "underline",
    marginLeft: 8,
  },
  starRating: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "flex-end",
    marginRight: 30,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 280,
    height: 280,
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "300",
    color: "#cf102d",
    marginLeft: 8,
    lineHeight: 24,
    fontStyle: "normal",
    textTransform: "capitalize",
  },
  benefitsContainer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: "#5B41FF",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  productDescription: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descriptionContent: {
    marginVertical: 8,
  },
  descriptionNote: {
    fontStyle: "italic",
    marginVertical: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 8,
  },
  qtyBox: {
    padding: 16,
  },
  quantityInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityInputField: {
    width: 60,
    textAlign: "center",
    borderBottomWidth: 1,
    padding: 4,
  },
  productDetailsContainer: {
    padding: 16,
  },
  /////////
  productInfoTable: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  productInfoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productInfoColumn: {
    flex: 1,
    padding: 8,
  },
  productInfoColumnTitle: {
    borderRightWidth: 1,
    borderRightColor: "#eee",
  },
  productInfoColumnContent: {
    backgroundColor: "#f8f8f8",
  },
  productInfoTitle: {
    fontWeight: "bold",
    fontSize: 14,
    margin:8
  },
  productInfoContent: {
    fontSize: 14,
    color: "#555",
    margin:8
  },
  noInfoText: {
    padding: 16,
    textAlign: "center",
    color: "#777",
  },
  toggleReadMoreButton: {
    color: "#007bff",
    textDecorationLine: "underline",
    marginTop: 8,
    textAlign: "center",
  },
  ////
  textRela: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
  relatedProductContainer: {
    marginHorizontal: 5,
    width: 180, 
    marginBottom:35,
    marginTop:30 // Đặt chiều rộng cho mỗi sản phẩm
  },
  imageWrapper: {
    height: 100, // Chiều cao cho ảnh sản phẩm
    justifyContent: "center",
    alignItems: "center",
  },
  productImageRe: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  price: {
    color: "#5B41FF",
    fontSize: 12,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProductDetail;
