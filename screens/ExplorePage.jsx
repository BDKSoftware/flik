import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import TopBar from "../components/TopBar";

import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NFTCard from "../components/NFTCard";

const ExplorePage = () => {
  const [category, setCategory] = React.useState("fire");

  //Change with API call
  const [filters, setFilters] = React.useState(null);

  // SET TO NULL ONCE API IS CALLED
  const [cards, setCards] = React.useState([
    {
      id: 1,
      name: "NFT 1",
      price: "2.23",
      timeSincePost: "12", // set this in minutes on the backend
      author: "@BradleyKukuk",
      likes: 12,
      image:
        "https://thumbor.thedailymeal.com/YdMaxJcfoH7UAxUfAHc0eLqpHtQ=/870x565/filters:format(webp)/https://www.theactivetimes.com/sites/default/files/slideshows/102277/114608/2_Mike_Beauchamp_istock_getty_images.jpg",
    },
    {
      id: 2,
      name: "NFT 2",
      price: "201.23",
      timeSincePost: "12", // set this in minutes on the backend
      author: "@BradleyKukuk",
      likes: 12,
      image:
        "https://i.pinimg.com/originals/cd/0c/13/cd0c13629f217c1ab72c61d0664b3f99.jpg",
    },
  ]);

  const handleSwitchCategory = (category) => {
    if (category === "fire") {
      setCategory("local");
    } else {
      setCategory("fire");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <TopBar />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>the marketplace</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleSwitchCategory(category)}
          style={{ ...styles.labels }}
        >
          <Fontisto name="fire" size={12} color="#FF0000" />
          <Text style={styles.labelText}>on fire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSwitchCategory(category)}
          style={styles.labels}
        >
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
        <TextInput placeholder="search" style={styles.search} />
      </View>

      {/* THIS WILL CHANGE SLIGHTLY WHEN API IS DONE */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.cardsContainer}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
      >
        {cards.map((card) => {
          return (
            <NFTCard
              id={card.id}
              name={card.name}
              price={card.price}
              timeSincePost={card.timeSincePost}
              author={card.author}
              likes={card.likes}
              image={card.image}
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-rocket" size={20} color="white" />
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
    height: "15%",
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
    height: "5%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginVertical: 10,
  },

  filter: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  cardsContainer: {
    alignSelf: "center",
    width: "98%",
    height: "60%",
  },

  button: {
    position: "absolute",
    left: 5,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7700FF",
  },

  buttonText: {
    color: "white",
    fontSize: 8,
    fontWeight: "600",
  },
});
