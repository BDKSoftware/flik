import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const SideBarModal = ({ show, setShow, image }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShow(false);
  };

  return (
    <Modal
      animationIn={"slideInLeft"}
      animationOut={"slideOutLeft"}
      animationInTiming={10}
      animationOutTiming={10}
      transparent={true}
      visible={show}
      style={{ alignItems: "center", justifyContent: "center" }}
      onSwipeMove={setShow}
      swipeDirection="left"
      useNativeDriver={true}
      onBackdropPress={setShow}
      backdropOpacity={0}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.topContainer}>
            <Image
              source={
                image == null
                  ? require("../assets/defaultImage.png")
                  : { uri: image }
              }
              style={styles.image}
            />
            <Text style={styles.username}>testuser</Text>
          </View>
          <View style={styles.linkContainer}>
            <View style={styles.link}>
              <MaterialIcons name="switch-account" size={20} color="grey" />
              <Text style={styles.linkText}>account</Text>
            </View>
            <View style={styles.link}>
              <Feather name="settings" size={20} color="grey" />
              <Text style={styles.linkText}>settings</Text>
            </View>
            <View style={styles.link}>
              <Ionicons name="wallet-outline" size={20} color="grey" />
              <Text style={{ ...styles.linkText }}>wallet {"  "}</Text>
            </View>
            <View style={{ ...styles.link }}>
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "100%",
                  height: "100%",
                }}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color="#7804fc"
                />
                <Text style={{ ...styles.linkText, color: "#7804fc" }}>
                  log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SideBarModal;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: "100%",
    opacity: 1,
    position: "absolute",
    top: -20,
    left: -20,
    borderBottomRightRadius: 52,
  },

  modal: {
    width: "100%",
    height: "105%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  topContainer: {
    marginTop: 50,
    width: "70%",
    height: "5%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: "#7804fc",
    borderWidth: 2,
  },

  username: {
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
  },

  linkContainer: {
    width: "100%",
    height: "40%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },

  link: {
    width: "60%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  linkText: {
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
    justifySelf: "flex-start",
  },
});
