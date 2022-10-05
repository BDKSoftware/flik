import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";

import TopBar from "../components/TopBar";

import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NFTCard from "../components/NFTCard";
import SearchModal from "../modals/SearchModal";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const ExplorePage = ({ navigation }) => {
  const [category, setCategory] = React.useState("fire");
  const [showSearch, setShowSearch] = React.useState(false);
  const [fire, setFire] = React.useState([]);
  const [local, setLocal] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState("All");

  //Change with API call
  const [filters, setFilters] = React.useState([]);

  // SET TO NULL ONCE API IS CALLED
  const [cards, setCards] = React.useState([]);

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

  const getFire = async () => {
    const userToken = await AsyncStorage.getItem("@user_token");
    try {
      await fetch(
        "http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/marketplace/onfire",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFire(data);
          setCards(data);
        })
        .catch(error);
      {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLocal = async () => {
    const userToken = await AsyncStorage.getItem("@user_token");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    try {
      await fetch(
        `http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/marketplace/local?currentLatitude=${location.coords.latitude}&currentLongitude=${location.coords.longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setLocal(data);
          setCards(data);
        })
        .catch(error);
      {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredSearch = async (filterName) => {
    const userToken = await AsyncStorage.getItem("@user_token");
    try {
      await fetch(
        `http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/nft/search?categories=${filterName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.log(data.message);
          } else {
            console.log(data);
            setCards(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log("Error");
    }
  };

  const searchByName = async (name) => {
    const userToken = await AsyncStorage.getItem("@user_token");
    try {
      await fetch(
        `http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/nft/search?name=${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.log(data.message);
          } else {
            console.log(data);
            setCards(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log("Error");
    }
  };

  const { isLoggedIn } = useAuth();

  const handleFire = async () => {
    setCards([]);
    setCategory("fire");
    getFire();
  };

  const handleLocal = async () => {
    setCards([]);
    setCategory("Local");
    getLocal();
  };

  const handleSearchModal = () => {
    setShowSearch(!showSearch);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCards([]);

    getFilteredSearch(filter);
  };

  const handleSearchByName = (name) => {
    setCards([]);
    searchByName(name);
  };

  // USE EFFECTS
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("LandingPage");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getFire();
    getFilters();
  }, []);

  return (
    <View style={styles.container}>
      <SearchModal
        isVisible={showSearch}
        setIsVisible={setShowSearch}
        handleFilterChange={handleFilterChange}
      />
      <View style={styles.topBarContainer}>
        <TopBar />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>the marketplace</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleFire} style={{ ...styles.labels }}>
          <Fontisto name="fire" size={12} color="#FF0000" />
          <Text style={styles.labelText}>on fire</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLocal} style={styles.labels}>
          <Entypo name="location" size={12} color="#2C774E" />
          <Text style={styles.labelText}>local</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>
          {category === "fire"
            ? "browse the most poppin' NFT's"
            : "browse NFT's made less than 5 miles away"}
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={15} color="9A9A9A" />
        <TextInput
          placeholder="search"
          style={styles.search}
          placeholderTextColor="grey"
          onChangeText={(value) => handleSearchByName(value)}
        />
      </View>

      {/* THIS WILL CHANGE SLIGHTLY WHEN API IS DONE */}
      <ScrollView
        style={styles.filterContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={
            activeFilter == "All"
              ? { ...styles.filter, backgroundColor: "#7700FF" }
              : { ...styles.filter }
          }
          onPress={() => {
            handleFilterChange("All");
            handleFire();
          }}
        >
          <Text
            style={
              activeFilter == "All"
                ? { ...styles.filterText, color: "white", fontWeight: "bold" }
                : { ...styles.filterText }
            }
          >
            All
          </Text>
        </TouchableOpacity>
        {filters.map((filter) => (
          <TouchableOpacity
            style={
              activeFilter == filter.title
                ? { ...styles.filter, backgroundColor: "#7700FF" }
                : { ...styles.filter }
            } // Change based off active filter
            key={filter.id}
            onPress={() => handleFilterChange(filter.title)}
          >
            <Text
              style={
                activeFilter == filter.title
                  ? { color: "white", fontWeight: "bold" }
                  : { color: "black" }
              }
            >
              {filter.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity
          onPress={handleSearchModal}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>more filters</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.cardsContainer}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        persistentScrollbar={false}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        scroll
      >
        {cards.length > 0 ? (
          cards.map((card, index) => {
            return (
              <NFTCard
                id={card.uuid}
                name={card.name}
                price={card.price}
                timeSincePost={card.timeSincePost}
                author={card.owner}
                likes={card.likes}
                image={card.imageUrl}
                key={index}
              />
            );
          })
        ) : (
          <ActivityIndicator
            size="large"
            color="#7700FF"
            style={{ marginTop: 100 }}
          />
        )}
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-rocket" size={15} color="white" />
        <Text style={styles.buttonText}>boost</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBarContainer: {
    width: "100%",
    height: "11%",
  },

  titleContainer: {
    width: "100%",
    height: "3%",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
  },

  buttonContainer: {
    alignSelf: "center",
    width: "60%",
    height: "7%",
    alignItems: "center",
    justifyContent: "space-evenly",

    flexDirection: "row",
  },

  labels: {
    width: "35%",
    height: "50%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  headingTextContainer: {
    width: "100%",
    height: "3%",
    alignItems: "center",
    justifyContent: "center",
  },

  headingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7B7B7D",
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

  filterContainer: {
    alignSelf: "center",
    width: "80%",
    height: "8%",
    flexDirection: "row",
    marginVertical: 10,
  },

  filter: {
    width: 85,
    height: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "hidden",
    marginHorizontal: 5,
  },

  cardsContainer: {
    alignSelf: "center",
    width: "98%",
    height: "100%",
  },

  button: {
    position: "absolute",
    left: 5,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#7700FF",
  },

  buttonText: {
    color: "white",
    fontSize: 6,
    fontWeight: "bold",
  },

  searchButtonContainer: {
    width: "100%",
    height: "4%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  searchButton: {
    height: "70%",
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#7700FF",
  },

  searchButtonText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "white",
  },
});
