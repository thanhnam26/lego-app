import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  ImageBackground,
} from "react-native";
import API from "../networking/ApiClient"; // Import API
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/action";
const backgroundImage = require("../assets/img/bgr.jpg");
import { Feather } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    try {
      const response = await API.apiLogin({ email, password });

      const { token, user } = response.data;

      console.log("User data:", user);

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(user));

      dispatch(setToken(token, user));

      Alert.alert("Login Successful", `Welcome back, ${user.fullName}!`);
      navigation.navigate("Tabs");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", "Please check your credentials.");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage} // Thay đổi URL đến hình nền của bạn
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>LEGO VN</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#999"
            selectionColor="transparent" // Loại bỏ màu sắc khi chọn
        
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              color="#5B41FF"
              size={24}
              style={styles.togglePasswordText}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  togglePasswordText: {
    marginLeft: 80,
    color: "#5B41FF",
    fontWeight: "bold",
  },

  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền sáng với độ trong suốt
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    fontSize: 36,
    color: "#5B41FF",
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    marginTop: 50,
  },
  input: {
    fontSize: 16,
    color: "#333",
    borderColor:"white"
    
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 30,
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#5B41FF",
    padding: 10,

    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 15,
    color: "#5B41FF",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Login;
