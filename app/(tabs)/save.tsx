import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const save = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <Image source={icons.jawa} className="w-20 h-20 mx-auto mt-20 mb-5" />
      <View className="items-center justify-center flex-1">
        <Text className="font-bold text-center text-white">Saved</Text>
      </View>
    </View>
  );
};

export default save;

const styles = StyleSheet.create({});
