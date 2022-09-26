import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import React from "react";

import TopBar from "../components/TopBar";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Expo Import
import * as ImagePicker from "expo-image-picker";

const PostPage = () => {
  const [image, setImage] = React.useState(null);

  const [category, setCategory] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    { label: "Food", value: "food" },
    { label: "Clothing", value: "clothing" },
    { label: "Furniture", value: "furniture" },
    { label: "Electronics", value: "electronics" },
    { label: "Other", value: "other" },
  ]);

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

  return (
    <View style={styles.container}>
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
        <KeyboardAwareScrollView
          behavior="padding"
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          contentContainerStyle={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            height: "90%",
            marginTop: 5,
          }}
          style={styles.form}
        >
          <TextInput style={styles.input} placeholder="give your NFT a name" />
          <TextInput
            style={styles.input}
            placeholder="set listing price in SOL"
          />
        </KeyboardAwareScrollView>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="select category"
            zIndex={3000}
            zIndexInverse={1000}
          />
          <TouchableOpacity style={styles.addItem}>
            <Text style={styles.addItemText}>new</Text>
          </TouchableOpacity>
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
    </View>
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
    height: "15%",
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

  form: {
    width: "100%",
    height: "100%",
  },

  input: {
    alignSelf: "center",
    borderColor: "trasparent",
    width: "90%",
    height: "40%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },

  dropdownContainer: {
    width: "90%",
    height: "25%",
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
