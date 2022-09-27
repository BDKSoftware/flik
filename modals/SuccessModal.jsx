import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import Modal from "react-native-modal";

import { AntDesign } from "@expo/vector-icons";

const SuccessModal = ({ isShowing, setIsShowing }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShowing}
      style={{ alignItems: "center", justifyContent: "center" }}
      backdropOpacity={0.5}
      hasBackdrop={true}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.titleContainer}>
            <AntDesign name="checkcircle" size={66} color="#2c774e" />
            <Text style={styles.titleText}>Success</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>you made a minty new NFT!</Text>
            <Text style={styles.text}>
              check it out on your home page and marketplace.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsShowing(false)}
          >
            <Text style={styles.buttonText}>continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    opacity: 1,
    borderBottomRightRadius: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    width: 304,
    height: 343,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  titleContainer: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  titleText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#2c774e",
  },

  textContainer: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2c774e",
    textAlign: "center",
  },

  button: {
    width: "70%",
    height: "10%",
    backgroundColor: "#2c774e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});
