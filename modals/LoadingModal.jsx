import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import Modal from "react-native-modal";

import { Octicons } from "@expo/vector-icons";

const ErrorNFTModal = ({ isShowing, setIsShowing }) => {
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
            <Octicons name="x-circle-fill" size={66} color="#B51919" />
            <Text style={styles.titleText}>error</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {"We couldn't process your request :("}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsShowing(false)}
          >
            <Text style={styles.buttonText}>try again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorNFTModal;

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
    height: "50%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  titleText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#B51919",
  },

  textContainer: {
    width: "80%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#B51919",
    textAlign: "center",
  },

  button: {
    width: "70%",
    height: "10%",
    backgroundColor: "#B51919",
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
