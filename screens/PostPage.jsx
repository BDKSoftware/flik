import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import TopBar from "../components/TopBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { manipulateAsync } from "expo-image-manipulator";

// Expo Import
import * as ImagePicker from "expo-image-picker";

//Import modals
import ErrorNFTModal from "../modals/ErrorNFTModal";
import SuccessModal from "../modals/SuccessModal";

const PostPage = ({ navigation }) => {
  // State values for input
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");

  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  const { isLoggedIn } = useAuth();

  const getCategories = async () => {
    setCategories([]);
    const userToken = await AsyncStorage.getItem("@user_token");
    await fetch(
      "http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/category",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        json.map((name, index) => {
          setCategories((categories) => [
            ...categories,
            { id: index, title: name.name },
          ]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append("imageFile", {
      name: name,
      type: "image",
      uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const mintNFT = async () => {
    const userToken = await AsyncStorage.getItem("@user_token");
    console.log("Minting NFT");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    try {
      await fetch(
        "http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/nft/mint",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "content-type": "multipart/form-data",
          },
          body: createFormData(image, {
            name: name,
            price: price,
            category: category,
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.message) {
            setShowErrorModal(true);
            console.log(json.message);
            console.log(json);
          } else {
            console.log(json);
            setShowSuccessModal(true);
            setCategory("");
            setName("");
            setPrice("");
            setImage(null);
          }
        });
    } catch (error) {
      console.log(error);
      console.log("error");
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("LandingPage");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCategories();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (image === null) {
      setCategory(" ");
    }
  }, [image]);

  // Open and Close Modal
  const handleActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Photo Gallery", "Camera"],
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          return;
        } else if (buttonIndex === 1) {
          pickImage();
        } else if (buttonIndex === 2) {
          openCamera();
        }
      }
    );
  };

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      exif: false,
      base64: true,
    });

    if (!result.cancelled) {
      result;
      setImage(result);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync(
      {}
    );

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.container}
    >
      <SuccessModal
        isShowing={showSuccessModal}
        setIsShowing={setShowSuccessModal}
      />
      <ErrorNFTModal
        isShowing={showErrorModal}
        setIsShowing={setShowErrorModal}
      />
      <View style={styles.topbarContainer}>
        <TopBar />
      </View>
      <View style={styles.titleContaienr}>
        <Text style={styles.titleText}>create your token</Text>
      </View>
      <View style={styles.imageContainer}>
        {image == null ? (
          <Text>Input an image</Text>
        ) : (
          <Image source={{ uri: image.uri }} style={styles.image} />
        )}
      </View>
      <View style={styles.formContaienr}>
        <TextInput
          style={styles.input}
          placeholder="give your NFT a name"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="set listing price in FLIKC"
          value={price}
          onChangeText={(value) => setPrice(value)}
        />
        <View style={styles.dropdownContainer}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            onSelectItem={setCategory}
            onChangeText={setCategory}
            value={category}
            dataSet={categories}
            containerStyle={{ width: "100%" }}
            direction="up"
            showChevron={false}
            showClear={false}
            textInputProps={{
              placeholder: "set category",

              style: {
                backgroundColor: "white",
                color: "black",
                borderRadius: 10,
              },
            }}
            suggestionsListContainerStyle={{
              backgroundColor: "white",
              borderRadius: 10,
            }}
            rightButtonsContainerStyle={{
              backgroundColor: "white",
            }}
            inputContainerStyle={{ backgroundColor: "white" }}
          />
        </View>
      </View>
      {!image ? (
        <TouchableOpacity style={styles.button} onPress={handleActionSheet}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={mintNFT}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      )}
    </KeyboardAwareScrollView>
  );
};

export default PostPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topbarContainer: {
    width: "100%",
    height: "10%",
  },

  titleContaienr: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleText: {
    fontSize: 30,
    fontWeight: "500",
  },

  imageContainer: {
    width: "90%",
    height: "40%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  formContaienr: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "black",
  },

  input: {
    alignSelf: "center",
    borderColor: "trasparent",
    width: "90%",
    height: "20%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },

  dropdownContainer: {
    width: "90%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  dropdown: {
    borderColor: "#f1f1f1",
    width: "75%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    color: "#f1f1f1",
    margin: 0,
  },

  addItem: {
    width: "20%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    borderRadius: 10,
    zIndex: 4000,
  },

  button: {
    width: "90%",
    height: "8%",
    backgroundColor: "#7700FF",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});
