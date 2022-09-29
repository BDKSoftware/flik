import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const NFTCard = ({ id, name, price, timeSincePost, author, likes, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price} APT</Text>
        <Text style={styles.timeSincePost}>{timeSincePost}m ago</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.likes}>{likes} likes</Text>
      </View>
    </View>
  );
};

export default NFTCard;

const styles = StyleSheet.create({
  card: {
    width: 260,
    height: 160,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  imageContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    alignSelf: "center",
    width: "60%",
    height: "80%",
    resizeMode: "cover",
    borderRadius: 8,
  },

  topContainer: {
    alignSelf: "center",
    width: "90%",
    height: "10%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  name: {
    fontSize: 12,
    fontWeight: "600",
    color: "black",
  },

  price: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0086FF",
  },

  timeSincePost: {
    fontSize: 12,
    fontWeight: "600",
    color: "grey",
  },

  bottomContainer: {
    alignSelf: "center",
    width: "80%",
    height: "10%",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  author: {
    fontSize: 10,
    fontWeight: "800",
    color: "grey",
  },

  likes: {
    fontSize: 10,
    fontWeight: "600",
    color: "grey",
  },
});
