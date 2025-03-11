import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { SplashScreen } from "../screens/SplashScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { CategoryScreen } from "../screens/CategoryScreen";

// Create Stack and Drawer Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// 📌 Drawer Navigation for different categories
const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Sports" component={CategoryScreen} initialParams={{ category: "sports" }} />
    <Drawer.Screen name="Business" component={CategoryScreen} initialParams={{ category: "business" }} />
    <Drawer.Screen name="Technology" component={CategoryScreen} initialParams={{ category: "technology" }} />
    <Drawer.Screen name="Science" component={CategoryScreen} initialParams={{ category: "science" }} />
    <Drawer.Screen name="Health" component={CategoryScreen} initialParams={{ category: "health" }} />
    <Drawer.Screen name="Entertainment" component={CategoryScreen} initialParams={{ category: "entertainment" }} />
  </Drawer.Navigator>
);

// 📌 Stack Navigation with Splash Screen
const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Home" component={DrawerNavigator} />
  </Stack.Navigator>
);

// 📌 Export App Navigation
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
