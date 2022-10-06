import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Feather } from "@expo/vector-icons";

const DropDown = ({ setCategory, category, categories }) => {
  return (
    <View style={{ flex: 1, zIndex: 100000000 }}>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={false}
        ChevronIconComponent={<Feather name="menu" size={16} color="grey" />}
        initialValue={{ id: "2" }} // or just '2'
        onSelectItem={(item) => {
          item && setCategory(item.title);
        }}
        //  dataSet={dataSet}
        dataSet={categories}
        direction="up"
        ItemSeparatorComponent={
          <View
            style={{ height: 1, width: "100%", backgroundColor: "#d8e1e6" }}
          />
        }
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
        textInputProps={{
          placeholder: "Select Category",
        }}
        inputContainerStyle={{
          backgroundColor: "white",
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({});
