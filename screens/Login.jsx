import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import ErrorModal from "../modals/ErrorModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function LoginPage({ navigation }) {
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("AuthenticatedStack");
    }
  }, [isLoggedIn]);

  const handleFirebaseError = (error) => {
    switch (error) {
      case "auth/invalid-email":
        setErrorMessage("Invalid email address");
        break;
      case "auth/user-disabled":
        setErrorMessage("User disabled");
        break;
      case "auth/user-not-found":
        setErrorMessage("User not found");
        break;
      case "auth/wrong-password":
        setErrorMessage("Wrong password");
        break;
      default:
        setErrorMessage("Unknown error");
        break;
    }
    setIsShowing(true);
  };

  const handleLogin = async () => {
    await fetch(
      "http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/auth/login/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.jwt) {
          AsyncStorage.setItem("@user_token", json.jwt);
          login("Token: " + json.jwt);
        } else {
          handleFirebaseError(json.message);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  return (
    <KeyboardAwareScrollView
      behavior="padding"
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <ErrorModal
        isShowing={isShowing}
        setIsShowing={setIsShowing}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      <View style={styles.topContainer}>
        <Image
          source={require("../assets/flik_white.png")}
          style={styles.title}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.formContainer}>
          <View style={styles.formtitleContainer}>
            <Text style={styles.formtitle}>login to your account</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.formInput}
              value={email}
              placeholder={"email"}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.formInput}
              value={password}
              placeholder={"password"}
              onChangeText={setPassword}
              //secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.button2Text}>need an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#a400ff",
  },

  topContainer: {
    height: "30%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },

  bottomContainer: {
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    width: "80%",
    height: "45%",
    borderRadius: 20,
    backgroundColor: "white",
  },

  formtitleContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  formtitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#a400ff",
  },

  inputContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  forgotPassword: {
    marginLeft: 130,
    color: "white",
    fontSize: 10,
  },

  formInput: {
    height: "20%",
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 30,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
  },

  buttonContainer: {
    width: "100%",
    height: "45%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  button: {
    height: "15%",
    width: "60%",
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },

  buttonText: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#a400ff",
  },

  button2Text: {
    fontSize: "12px",
    color: "#FFFFFF",
    fontWeight: "400",
  },

  lineContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  line: {
    borderBottomWidth: 2,
    borderBottomColor: "#7804fc",
    width: "40%",
    marginHorizontal: 10,
  },

  lineText: {
    color: "#7804fc",
  },

  socialContainer: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    height: 50,
    width: 50,
    marginHorizontal: 25,
  },
});
