import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { NewzType } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
type Props = {
  item: NewzType;
  index: number;
  scroll: SharedValue<number>;
};
export default function Slider({ item, index, scroll }: Props) {
  const { width } = Dimensions.get("screen");
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scroll.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scroll.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Link href={`../news/${item.article_id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          // style={[rnStyle]}
          className={`relative w-[410px] justify-center items-center`}
        >
          <Image
            source={{
              uri: item.image_url,
            }}
            className={`w-[391px] ml-3 left[19px] h-[200px] rounded-[20px]`}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={{ borderRadius: 20 }}
            className={`absolute right-[4.5px] top-0 w-[396px] h-[200px] p-3`}
          >
            <View className="absolute flex-row top-36 px-5 items-center gap-2">
              {item.source_icon && (
                <Image
                  source={{ uri: item.source_icon }}
                  className="w-6 h-6 rounded-3xl"
                />
              )}
              <Text className="text-white font-semibold text-sm">
                {item.source_name}
              </Text>
            </View>
            <Text className="text-white text-base absolute top-44 font-semibold px-5">
              {item.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
}
