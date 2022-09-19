import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { logout } from "../firebase";

const HomePage = ({ navigation }) => {
  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("Logged out");
        navigation.navigate("LandingPage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
