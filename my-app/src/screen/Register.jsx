import React, { useState } from "react";
import { 
  SafeAreaView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ImageBackground, 
  View 
} from "react-native";
import API from "../networking/ApiClient"; // Import API
const backgroundImage = require("../assets/img/bgr.jpg");

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    try {
      const response = await API.apiRegister({ fullName, email, password, dob, phone, address });
      // Handle success response here (e.g., navigate to Login)
      Alert.alert("Registration Successful", "You can now login.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration failed:", error);
      Alert.alert("Registration Failed", "Please try again.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>Register</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Họ và Tên"
          value={fullName}
          onChangeText={setFullName}
           placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Ngày sinh (YYYY-MM-DD)"
          value={dob}
          onChangeText={setDob}
           placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
           placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
           placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
           placeholderTextColor="#999"
        />
        <View style={styles.passwordContainer}>
          <TextInput
           placeholderTextColor="#999"
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.togglePasswordText}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
             placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text style={styles.togglePasswordText}>{showConfirmPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
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
    width: "85%",
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
    height: 40,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 40,
    fontSize: 16,
    color: "#fff", // Màu chữ trong TextInput
    backgroundColor: "#f0f0f0", // Màu nền của ô nhập
    width: "70%",
    
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  togglePasswordText: {
    marginLeft: 30,
    color: "#5B41FF",
    fontWeight: "bold",
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

export default Register;
