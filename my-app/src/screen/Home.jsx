import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,

  StyleSheet,

  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useDispatch,useSelector  } from "react-redux";
import { addToCart } from "../redux/action";
import Product from "../screen/Product"; // Assuming you have ProductCard component
import { colors } from "../constant/color"; // Using colors from constants
import Category from "../components/Category"; // Assuming you have a Category component
import { fontSize, iconSize, spacing } from "../constant/demention";
import { fontFamily } from "../constant/font";
import API from "../networking/ApiClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
const backgroundImage = require("../assets/img/bgr.jpg");
const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Thêm trạng thái cho trang hiện tại
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
 

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const loadData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await API.apiAll(searchText, page); 
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages); 
      setError(null);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    setCurrentPage(1); // Đặt lại trang hiện tại khi tìm kiếm
    loadData(1);
  };
  const handleUpdateCategory = async (categoryId, categoryName) => {
    try {
      setLoading(true);
      setSelectedCategory(categoryName);
      if (categoryId) {
        const response = await API.apiGetProductsByCategory(categoryId);
        setProducts(response.data);
      } else {
        // If no category selected, load all products
       loadData();
      }
    } catch (error) {
      setError("Failed to load products for this category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData(currentPage);
  }, [searchText,currentPage]);
  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
       <SafeAreaView style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Header
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch} // Hàm tìm kiếm đã định nghĩa trước đó
      />
      <FlatList
        ListHeaderComponent={
          <>
            <Category
              selectedCategory={selectedCategory}
              handleUpdateCategory={handleUpdateCategory}
            />
          </>
        }
        data={products}
        renderItem={({ item }) => (
          <Product products={item} handleAddToCart={handleAddToCart} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={colors.purple} />
          ) : (
            <Text style={styles.noProductsText}>No products found</Text>
          )
        }
        ListFooterComponent={
          <>
          
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <Footer />
          </>
        }
      />
    </SafeAreaView>
    </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
   
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingBottom: spacing.lg,
  },
  headline: {
    fontSize: fontSize.xxl,
    color: colors.black,
    fontFamily: fontFamily.Bold,
    marginLeft: 10,
    fontStyle: "italic",
  },
  mainInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.xl,
  },
  inputWrapper: {
    flex: 1,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.placeholderText,
    borderRadius: 44,
    paddingHorizontal: spacing.md,
  },
  logo: {
    height: iconSize.md,
    width: iconSize.md,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.Medium,
  },
  categoryContainer: {
    paddingHorizontal: spacing.sm,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default HomeScreen;
