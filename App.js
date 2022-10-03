import React, { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// App Imports
import HomePage from "./screens/HomePage";
import PostPage from "./screens/PostPage";
import ExplorePage from "./screens/ExplorePage";

// Auth Screen Imports
import LandingPage from "./screens/LandingPage";
import Register from "./screens/Register";
import Login from "./screens/Login";

//Icon Imports
import { Entypo } from "@expo/vector-icons"; //home
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AuthenticatedStack"
            component={AuthenticatedStack}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const Tab = createBottomTabNavigator();

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#495ECA",
        tabBarInactiveTintColor: "grey",
        tabBarActiveBackgroundColor: "#F6F6F9",
        tabBarStyle: {
          width: "80%",
          height: "10%",
          alignSelf: "center",
          marginBottom: 20,
          borderRadius: 20,
          paddingBottom: 0,
          paddingHorizontal: 10,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          height: "80%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 20,
        },
      }}
      initialRouteName="HomePage"
    >
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="post"
        component={PostPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-camera-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExplorePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="storefront" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
