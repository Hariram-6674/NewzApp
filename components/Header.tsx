import { View, Text, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

export default function Header() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const greetingOpacity = useRef(new Animated.Value(1)).current;
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 🌅";
    if (hour < 18) return "Good Afternoon ☀️";
    return "Good Evening 🌙";
  };

  // Fade in animation on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Subtle pulse animation for greeting
  useEffect(() => {
    const pulseGreeting = () => {
      Animated.sequence([
        Animated.timing(greetingOpacity, {
          toValue: 0.7,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(greetingOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ]).start(() => pulseGreeting());
    };

    pulseGreeting();
  }, []);
  
  return (
    <Animated.View 
      className="px-5 mb-5"
      style={{ opacity: fadeAnim }}
    >
      <View className="flex-row items-center gap-2">
        <Image
          source={require("../assets/images/ProfPic.jpg")}
          className="w-14 h-14 rounded-full border-hairline border-white"
        />
        <View>
          <Animated.View 
            style={{ opacity: greetingOpacity }}
            className="flex-row items-center gap-1"
          >
            <Text className="text-gray-300 text-[12px] font-normal">
              {getGreeting()}
            </Text>
          </Animated.View>
          <View className="flex-row items-center gap-1">
            <Text className="text-gray-100 font-bold text-lg">Hariram!</Text>
            <Text className="text-gray-100 text-xs">👋</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}