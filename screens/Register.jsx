import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { addDisplayName, signUp } from "../firebase";

export default function LandingPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async () => {
    await signUp(email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        addDisplayName(user, username);
        navigation.navigate("Login");
        alert("Successfully registered!");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
      });
  };

  return (
    <KeyboardAwareScrollView
      behavior="padding"
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <View style={styles.topContainer}>
        <Text style={styles.title}>flik</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.formContainer}>
          <View style={styles.formtitleContainer}>
            <Text style={styles.formtitle}>create your account</Text>
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
              secureTextEntry={true}
            />
            <TextInput
              style={styles.formInput}
              value={confirm}
              placeholder={"confirm password"}
              onChangeText={setConfirm}
              secureTextEntry={true}
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
    height: "25%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: "64px",
    fontWeight: "800",
    color: "#FFFFFF",
  },

  bottomContainer: {
    height: "75%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    width: "80%",
    height: "75%",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
    color: "#FFFFFF",
  },

  inputContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  formInput: {
    height: "10%",
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 30,
  },

  buttonContainer: {
    width: "100%",
    height: "25%",
    alignItems: "center",
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
});
