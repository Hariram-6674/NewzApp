import { View, Text, TextInput } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function Search({ horipad,searchQuery }: { horipad: boolean,searchQuery?:Function }) {
  return (
    <View className={`mb-5 ${horipad ? "px-5" : ""}`}>
      <View className="bg-[#333333] px-[10px] items-center gap-4 py-3 rounded-[10px] flex-row">
        <FontAwesome name="search" size={20} color="white" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"white"}
          className="flex-1 text-base text-white"
          autoCapitalize="none"
          onChangeText={query => searchQuery?.(query)}
        />
      </View>
    </View>
  );
}
