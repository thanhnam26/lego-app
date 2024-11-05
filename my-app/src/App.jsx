import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import React, { useEffect } from "react";
import Tabbar from "./components/Tabbar";
import ProductDetail from "./screen/ProductDetail"; // Import màn hình chi tiết sản phẩm
import { Provider } from "react-redux";
import store from "./redux/store";
import { useDispatch } from "react-redux";
import { setInitialState } from "./redux/action";
import { loadState } from "./redux/reducer";
import Login from "./screen/Login"; // Import màn hình Login
import Register from "./screen/Register";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeCart = async () => {
      const savedState = await loadState();
      dispatch(setInitialState(savedState));
    };
    initializeCart();
  }, [dispatch]);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
          <Stack.Screen
          name="Login"
          component={Login} // Đảm bảo rằng component Login đã được tạo
          options={{ headerShown: false, title: "Login" }} // Thay đổi tiêu đề và ẩn tiêu đề nếu cần
        />
        <Stack.Screen
          name="Register"
          component={Register} // Đảm bảo rằng component Register đã được tạo
          options={{ headerShown: false, title: "Register" }} // Thay đổi tiêu đề và ẩn tiêu đề nếu cần
        />
        <Stack.Screen
          name="Tabs"
          component={Tabbar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            headerShown: true,
            title: "Product Detail",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              color: "#000",
            },
            headerBackTitle: " ",
            headerStatusBarHeight: 0,
            safeAreaInsets: { top: 0 },
            contentStyle: {
              marginTop: 0,
            },
          }}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
