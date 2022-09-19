import { createNativeStackNavigator } from "@react-navigation/native-stack";

// App Imports
import HomePage from "./screens/HomePage";

// Auth Screen Imports
import LandingPage from "./screens/LandingPage";
import Register from "./screens/Register";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={HomePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

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
