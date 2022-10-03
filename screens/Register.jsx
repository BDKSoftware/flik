import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ErrorModal from "../modals/ErrorModal";

export default function LandingPage({ navigation }) {
  const { register, isLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profileImage, setProfileImage] = useState(
    require("../assets/defaultImage.png")
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("AuthenticatedStack");
    }
  }, [isLoggedIn]);

  const handleFirebaseError = (error) => {
    switch (error) {
      case "auth/email-already-in-use":
        setErrorMessage("Email already in use");
        break;
      case "auth/invalid-email":
        setErrorMessage("Invalid email address");
        break;
      case "auth/weak-password":
        setErrorMessage("Password must be at least 6 characters");
        break;
      default:
        setErrorMessage("Unknown error");
        break;
    }
    setIsShowing(true);
  };

  const handleRegister = async () => {
    await fetch(
      "http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
          username: username,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          console.log(json);
          register();
          navigation.navigate("Login");
        } else {
          handleFirebaseError(json.message);
        }
      })
      .catch((error) => {
        console.log(error);
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
            <Text style={styles.formtitle}>create your account</Text>
          </View>
          <View style={styles.imageInputContainer}>
            <Image
              source={profileImage}
              defaultSource={profileImage}
              style={styles.image}
            />
            <TouchableOpacity>
              <Text style={styles.imageText}>upload profile picture</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.formInput}
              value={username}
              placeholder={"username"}
              onChangeText={setUsername}
            />
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
              // secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>register</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.button2Text}
              onPress={() => navigation.navigate("Login")}
            >
              already have an account?
            </Text>
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
    backgroundColor: "#7804fc",
  },

  topContainer: {
    height: "20%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 100,
    width: 200,
    height: 100,
    resizeMode: "contain",
  },

  bottomContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    width: "80%",
    height: "70%",
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },

  formtitleContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  formtitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#7804fc",
  },

  inputContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  formInput: {
    height: "15%",
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
    height: "25%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  button: {
    height: "30%",
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
    color: "#7700FF",
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

  imageInputContainer: {
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    resizeMode: "contain",
  },

  imageText: {
    color: "#7804fc",
    fontSize: 12,
    fontWeight: "700",

    padding: 5,
  },
});
