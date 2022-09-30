import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React from "react";

import Modal from "react-native-modal";

import { AntDesign } from "@expo/vector-icons";

const SearchModal = ({ isVisible, setIsVisible }) => {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("All");

  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      animationInTiming={10}
      animationOutTiming={10}
      transparent={true}
      visible={isVisible}
      hasBackdrop={true}
      swipeDirection={["right"]}
      onSwipeMove={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      backdropOpacity={0}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.searchContainer}>
            <AntDesign name="search1" size={15} color="9A9A9A" />
            <TextInput placeholder="search" style={styles.search} />
          </View>
          <Text style={styles.bottomText}>Swipe right to close</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: "100%",
    opacity: 1,
    position: "absolute",
    top: -20,
    right: -20,
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

  searchContainer: {
    marginTop: 100,
    alignSelf: "center",
    width: "80%",
    height: "5%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 10,
  },

  search: {
    width: "90%",
    height: "100%",
    marginLeft: 10,
    fontSize: 16,
  },

  bottomText: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    color: "lightgrey",
    fontSize: 12,
  },
});
