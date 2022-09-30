import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";

const NFTCard = ({ id, name, price, timeSincePost, author, likes, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.timeSincePost}>
          <AntDesign name="clockcircleo" size={11} color="grey" />
          {" " + timeSincePost}m ago
        </Text>
        <Text style={styles.likes}>
          <AntDesign name="heart" size={11} color="red" />
          {" " + likes}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>{price} APT</Text>
        <Text style={styles.author}>{author}</Text>
      </View>
    </View>
  );
};

export default NFTCard;

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 200,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  imageContainer: {
    width: "100%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    alignSelf: "center",
    width: "95%",
    height: "90%",
    resizeMode: "cover",
    borderRadius: 8,
  },

  topContainer: {
    alignSelf: "center",
    width: "90%",
    height: "15%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  name: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },

  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0086FF",
  },

  timeSincePost: {
    fontSize: 12,
    fontWeight: "600",
    color: "grey",
  },

  bottomContainer: {
    alignSelf: "center",
    width: "60%",
    height: "15%",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  author: {
    fontSize: 12,
    fontWeight: "800",
    color: "grey",
  },

  likes: {
    fontSize: 12,
    fontWeight: "600",
    color: "red",
  },
});
