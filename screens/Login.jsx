import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { login } from "../firebase";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    return await login(email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        navigation.navigate("AuthenticatedStack", {
          screen: "Home",
          params: { user },
        });
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
      <View style={styles.topContainer}>
        <Text style={styles.title}>flik</Text>
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

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
            <Text style={styles.lineText}>or</Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.socialContainer}>
            <TouchableOpacity>
              <Image
                source={require("../assets/facebook.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/google.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
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
    backgroundColor: "#7804fc",
  },

  topContainer: {
    height: "30%",
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
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    width: "80%",
    height: "65%",
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
    color: "#7804fc",
  },

  inputContainer: {
    height: "50%",
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
});
