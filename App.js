import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// App Imports
import HomePage from "./screens/HomePage";

// Auth Screen Imports
import LandingPage from "./screens/LandingPage";
import Register from "./screens/Register";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  console.disableYellowBox = true;

  return (
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
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
