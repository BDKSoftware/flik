import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function LandingPage({ navigation }) {
  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>flik</Text>
      </View>
      <View style={styles.triangleContainer}>
        <Image
          source={require("../assets/Triangle.png")}
          style={styles.triangleLeft}
        />
        <Image
          source={require("../assets/Triangle.png")}
          style={styles.triangleMid}
        />
        <Image
          source={require("../assets/Triangle.png")}
          style={styles.triangleRight}
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
    backgroundColor: "#7804fc",
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
    fontSize: "64px",
    fontWeight: "800",
    color: "#FFFFFF",
  },

  triangleContainer: {
    width: "100%",
    height: "60%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  triangleLeft: {
    position: "absolute",
    bottom: 0,
    right: -100,
  },

  triangleMid: {
    position: "absolute",
    bottom: 0,
  },

  triangleRight: {
    position: "absolute",
    bottom: 0,
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
    color: "#7B16FF",
  },

  button2Text: {
    fontSize: "12px",
    color: "#FFFFFF",
    marginTop: 20,
    fontWeight: "400",
  },
});
