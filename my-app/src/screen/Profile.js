import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector để lấy state từ Redux
import {removeToken} from "../redux/action"
import { useNavigation } from '@react-navigation/native';
const backgroundImage = require("../assets/img/bgr.jpg");

const ProfileScreen = () => {
  // Lấy thông tin người dùng từ Redux
  const userProfile = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  if (!userProfile) {
    return <Text>Loading...</Text>;
  }
const handleLogout= ()=>{
  dispatch(removeToken())
  navigation.navigate('Login');
}
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
       <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#5B41FF" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: userProfile.avatar }} // Sử dụng avatar URL từ Redux
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.name}>{userProfile.fullName}</Text>
      <View >
      {userProfile.status && (
        <View style={styles.statusContainer}>
          <View style={styles.statusIndicator} />
          <Text style={styles.bio}>Active</Text>
        </View>
      )}
      {!userProfile.status && <Text style={styles.bio}>inactive</Text>}

      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          <TouchableOpacity>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#5B41FF" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{userProfile.email}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#5B41FF" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Ngày sinh</Text>
            <Text style={styles.infoValue}>
              {userProfile.dob
                ? new Date(userProfile.dob).toLocaleDateString("vi-VN")
                : "null"}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="phone" size={20} color="#5B41FF" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            <Text style={styles.infoValue}>{userProfile.phone}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#5B41FF" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Địa chỉ</Text>
            <Text style={styles.infoValue}>{userProfile.address}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utilities</Text>

   

        <TouchableOpacity style={styles.utilityRow}>
          <View style={styles.utilityLeft}>
            <FontAwesome name="question-circle" size={20} color="#5B41FF" />
            <Text style={styles.utilityText}>Help</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.utilityRow} onPress={handleLogout}>
          <View style={styles.utilityLeft}>
            <MaterialIcons name="logout" size={20} color="#5B41FF" />
            <Text style={styles.utilityText}>Log Out</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </ScrollView>
    </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
   
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    display: "flex",
    justifyContent: "center"
  },
  statusIndicator: {
    width: 10, // Đường kính của hình tròn
    height: 10,
    borderRadius: 5, // Để tạo hình tròn
    backgroundColor: 'green', // Màu xanh lá cây
    marginRight: 5, // Khoảng cách giữa hình tròn và chữ
  },
 
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 20
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
  },
  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 16,
  },
  bio: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  activeStatus: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  section: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom:30
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  editButton: {
    color: "#5B41FF",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  infoContent: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
  },
  utilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  utilityLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  utilityText: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default ProfileScreen;
