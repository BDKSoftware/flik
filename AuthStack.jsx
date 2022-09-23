import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// App Imports
import HomePage from "./screens/HomePage";

// Auth Screen Imports
import LandingPage from "./screens/LandingPage";
import Register from "./screens/Register";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export function AppStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "grey",
          tabBarInactiveTintColor: "white",
        }}
      >
        <Tab.Screen name="home" component={HomePage} />
        <Tab.Screen name="post" component={SettingsScreen} />
        <Tab.Screen name="explore" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export const AuthStack = () => {
  return (
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
    </Stack.Navigator>
  );
};
