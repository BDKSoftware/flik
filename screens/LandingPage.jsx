import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function LandingPage({ navigation }) {
  const { isLoggedIn } = useAuth();

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("AuthenticatedStack");
    }
  }, [isLoggedIn]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require("../assets/flik_white.png")}
          style={styles.title}
        />
      </View>
      <View style={styles.triangleContainer}>
        <Animatable.Image
          source={require("../assets/Triangle.png")}
          style={styles.triangleLeft}
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          direction={"reverse"}
        />
        <Animatable.Image
          source={require("../assets/Triangle.png")}
          style={styles.triangleMid}
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          direction={"reverse"}
        />
        <Animatable.Image
          source={require("../assets/Triangle.png")}
          style={styles.triangleRight}
          animation="pulse"
          iterationCount="infinite"
          easing="ease-out"
          direction={"reverse"}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToRegister}
        >
          <Text style={styles.buttonText}>get started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateToLogin}>
          <Text style={styles.button2Text}>already have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#a400ff",
    alignItems: "center",
    justifyContent: "center",
  },

  topContainer: {
    position: "absolute",
    top: 0,
    height: "30%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },

  triangleContainer: {
    width: "100%",
    height: "60%",
    position: "absolute",
    bottom: -20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  triangleLeft: {
    position: "absolute",
    bottom: -20,
    right: -100,
  },

  triangleMid: {
    position: "absolute",
    bottom: -20,
  },

  triangleRight: {
    position: "absolute",
    bottom: -20,
    left: -100,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 40,
    height: "20%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "70%",
    height: "30%",
    borderRadius: 100,
  },

  buttonText: {
    fontSize: "18px",
    fontWeight: "700",
    textAlign: "center",
    color: "#a400ff",
  },

  button2Text: {
    fontSize: "12px",
    color: "#FFFFFF",
    marginTop: 20,
    fontWeight: "400",
  },
});
