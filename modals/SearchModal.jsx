import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React from "react";

import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";

const SearchModal = ({ isVisible, setIsVisible, handleFilterChange }) => {
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState([]);

  const handleSearch = () => {
    setFilters([]);
    searchFilters(search);
  };

  const getFilters = async () => {
    setFilters([]);
    const userToken = await AsyncStorage.getItem("@user_token");
    await fetch(
      "http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/category",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json.map((name, index) => {
          setFilters((categories) => [
            ...categories,
            { id: index, title: name.name },
          ]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchFilters = async (value) => {
    const userToken = await AsyncStorage.getItem("@user_token");
    await fetch(
      `http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/category?filter=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json.map((name, index) => {
          setFilters((filters) => [
            ...filters,
            { id: index, title: name.name },
          ]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getFilters();
  }, []);

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
            <TextInput
              placeholder="search"
              style={styles.search}
              placeholderTextColor="black"
              value={search}
              onChangeText={(value) => setSearch(value)}
              onSubmitEditing={handleSearch}
            />
          </View>
          <ScrollView style={styles.filters}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={styles.filterContainer}
                onPress={() => {
                  handleFilterChange(filter.title);
                  setIsVisible(false);
                }}
              >
                <Text style={styles.filterText}>{filter.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    color: "black",
  },

  bottomText: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    color: "lightgrey",
    fontSize: 12,
  },

  filters: {
    alignSelf: "center",
    marginTop: 20,
    width: "100%",
    height: "80%",
    borderColor: "lightgrey",
    borderWidth: 1,
  },

  filterContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },

  filterText: {
    fontSize: 16,
    color: "black",
  },
});
