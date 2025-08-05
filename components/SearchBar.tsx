import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center px-5 py-4 rounded-full px bg-dark-200">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
};

export default SearchBar;
