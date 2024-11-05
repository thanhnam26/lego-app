import { Feather } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View } from "react-native";

const Header = ({ searchVisible, setSearchVisible, searchText, setSearchText, handleSearch }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.header}>
        {searchVisible ? (
          <>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm sản phẩm..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              placeholderTextColor="#5B41FF" 
              // Gọi hàm tìm kiếm khi nhấn Enter
            />
            <TouchableOpacity onPress={() => setSearchVisible(false)}>
              <Feather name="x" size={30} color="#5B41FF" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.logo}>LEGO VN</Text>
            <TouchableOpacity onPress={() => setSearchVisible(true)}>
              <Feather name="search" size={30} color="#5B41FF" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
   
    backgroundColor: "rgba(255, 255, 255, 0.7)",
     // Nền màu bao phủ tai thỏ
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    
    
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5B41FF',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 3,
    borderColor:'#5B41FF',
    
  },
});

export default Header;
