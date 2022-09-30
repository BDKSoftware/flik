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
      animationType="slideUp"
      animationOut={"fadeOut"}
      transparent={true}
      visible={isVisible}
      style={{ alignItems: "center", justifyContent: "center" }}
      hasBackdrop={true}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      customBackdrop={
        <View style={{ flex: 1, backgroundColor: "black", opacity: 0.7 }} />
      }
      swipeDirection="down"
      onSwipeMove={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setFilter("All")}
              style={{
                ...styles.tab,
                backgroundColor: filter === "All" ? "#7700FF" : "white",
              }}
            >
              <Text
                style={{
                  ...styles.tabText,
                  color: filter === "All" ? "white" : "black",
                  fontWeight: filter === "All" ? "700" : "500",
                }}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilter("NFT")}
              style={{
                ...styles.tab,
                backgroundColor: filter === "NFT" ? "#7700FF" : "white",
              }}
            >
              <Text
                style={{
                  ...styles.tabText,
                  color: filter === "NFT" ? "white" : "black",
                  fontWeight: filter === "NFT" ? "700" : "500",
                }}
              >
                NFTs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilter("Categories")}
              style={{
                ...styles.tab,
                backgroundColor: filter === "Categories" ? "#7700FF" : "white",
              }}
            >
              <Text
                style={{
                  ...styles.tabText,
                  color: filter === "Categories" ? "white" : "black",
                  fontWeight: filter === "Categories" ? "700" : "500",
                }}
              >
                Categories
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <AntDesign name="search1" size={15} color="9A9A9A" />
            <TextInput placeholder="search" style={styles.search} />
          </View>
          <Text style={styles.bottomText}>Swipe down to close</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    width: 350,
    height: 500,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  tabContainer: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  tab: {
    width: "30%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 10,
  },

  searchContainer: {
    marginTop: "2%",
    alignSelf: "center",
    width: "80%",
    height: "8%",
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
