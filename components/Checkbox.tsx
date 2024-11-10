import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const Checkbox = ({ label, checked, onPress }: Props) => {
  const ani = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(checked ? "#dc2626" : "transparent", {
        duration: 150,
      }),
      borderColor: withTiming(checked ? "#dc2626" : "white", { duration: 150 }),
      paddingLeft: 14,
      paddingRight: checked ? 10 : 14,
    };
  }, [checked]);

  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming("white", { duration: 150 }),
    };
  }, [checked]);

  return (
    <Animated.View
      className="flex-row justify-center items-center border-[1px] py-3 rounded-[32px]"
      style={[ani]}
      onTouchEnd={onPress}
      layout={LinearTransition.springify().mass(0.8)}
    >
      <Animated.Text style={[textStyle]} className="text-sm text-white">
        {label} </Animated.Text>
      {checked && (
        <Animated.View
          className="ml-2 h-4 w-4"
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
        >
          <AntDesign name="checkcircle" size={14} color={"white"} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default Checkbox;
