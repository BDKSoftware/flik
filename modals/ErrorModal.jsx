import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const ErrorModal = ({
  isShowing,
  setIsShowing,
  errorMessage,
  setErrorMessage,
}) => {
  const handleClose = () => {
    setIsShowing(false);
    setErrorMessage("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShowing}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Image source={require("../assets/error.png")} style={styles.image} />
          <Text style={styles.modalText}>{errorMessage}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },

  modal: {
    width: "60%",
    height: "20%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 20,
    borderColor: "red",
    borderWidth: 5,
  },

  image: {
    marginBottom: 10,
    width: 35,
    height: 35,
  },

  modalText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },

  closeButton: {
    marginTop: 10,
    width: "80%",
    height: "15%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
