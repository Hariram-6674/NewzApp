import { View, Text } from "react-native";
import React from "react";
import { NewzType } from "@/types";
import Animated, { SharedValue } from "react-native-reanimated";
type Props = {
  item: NewzType[];
  pageindex: number;
  scroll: SharedValue<number>;
};
export default function Page({ item, pageindex, scroll }: Props) {
  return (
    <View className="flex-row h-10 justify-center items-center">
      {item.map((_,index) => {
        return (
          <Animated.View className={`bg-[#333] h-2 w-2 mx-[2px] rounded-lg ${pageindex===index?"bg-red-700":"bg-gray-800"}`} key={index}/>
        );
      })}
    </View>
  );
}
