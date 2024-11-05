import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "react-native";
import { colors } from "../constant/color";
import { fontSize, spacing } from "../constant/demention";
import { fontFamily } from "../constant/font";
import API from "../networking/ApiClient";

const Category = ({ selectedCategory, handleUpdateCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await API.apiAllCategory();
      setCategories([
        { id: "all", name: "All Products" }, // Add "All Products" category
        ...response.data.data,
      ]);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="small" color={colors.purple} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleUpdateCategory(item.id === "all" ? null : item.id, item.name)}
          style={styles.categoryItem}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.name && styles.selectedCategoryText,
            ]}
          >
            {item.name}
          </Text>
          {selectedCategory === item.name && <View style={styles.underline} />}
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spacing.md,
    marginTop:18
  },
  categoryItem: {
    marginRight: spacing.xl,
  },
  categoryText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.SemiBold,
    color: colors.black,
  },
  selectedCategoryText: {
    color: colors.purple,
  },
  underline: {
    borderBottomColor: colors.purple,
    borderBottomWidth: 2,
    width: "50%",
    marginTop: spacing.sm,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: spacing.md,
    fontFamily: fontFamily.Medium,
  },
});

export default Category;