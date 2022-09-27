import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import WalletPage from "../screens/WalletPage";

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="wallet" component={WalletPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
