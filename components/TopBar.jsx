import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import SideBarModal from "../modals/SideBarModal";

const TopBar = ({ navigation }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <View style={styles.container}>
      <SideBarModal
        show={showSidebar}
        setShow={toggleSidebar}
        navigation={navigation}
      />
      <TouchableOpacity onPress={toggleSidebar}>
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "#7700FF", fontSize: 24, fontWeight: "bold" }}>
          f
        </Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          lik
        </Text>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 10,
    flexDirection: "row",
    height: 30,
    width: 70,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
