import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
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
        image={require("../assets/headshot.jpg")}
        navigation={navigation}
      />
      <TouchableOpacity onPress={toggleSidebar}>
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/flik_purple.png")}
          style={styles.title}
        />
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

  title: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: 10,
  },
});
