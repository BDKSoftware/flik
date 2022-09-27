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

import TopBar from "../components/TopBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

// Expo Import
import * as ImagePicker from "expo-image-picker";

//Import modals
import ErrorNFTModal from "../modals/ErrorNFTModal";
import SuccessModal from "../modals/SuccessModal";

const PostPage = () => {
  const [image, setImage] = React.useState(null);

  const [category, setCategory] = React.useState("");
  const [showSuccessModal, setShowSuccessModal] = React.useState(true);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  let items = [
    { id: "0", title: "Food" },
    { id: "1", title: "Clothing" },
    { id: "2", title: "Furniture" },
    { id: "3", title: "Games" },
    { id: "4", title: "Friends" },
    { id: "5", title: "Nature" },
    { id: "6", title: "Technology" },
    { id: "7", title: "Sports" },
    { id: "8", title: "Electronics" },
    { id: "9", title: "Other" },
  ];

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
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  useEffect(() => {
    console.log("Category: " + category);
  }, [category]);

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
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.formContaienr}>
        <TextInput style={styles.input} placeholder="give your NFT a name" />
        <TextInput
          style={styles.input}
          placeholder="set listing price in FLIKC"
        />
        <View style={styles.dropdownContainer}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            onSelectItem={setCategory}
            dataSet={items}
            containerStyle={{ width: "100%" }}
            direction="up"
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
        <TouchableOpacity style={styles.button}>
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
