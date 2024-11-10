import { View, Text, TouchableOpacity, ImageBackground, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import Animated,{FadeInRight,FadeInDown,FadeOutLeft} from "react-native-reanimated";
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

export default function Page() {
  useEffect(() => {
    const setupNavigationBar = async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBackgroundColorAsync("transparent");
      }
    };

    setupNavigationBar();
  }, []);
  return (
    <View className="flex-1">
      <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"}/>
      <ImageBackground
        source={require("../assets/images/startPic.jpg")}
        className="flex-1"
      >
        <View className="flex-1 justify-end pb-12 px-8 gap-2 bg-[#00000080]">
          <Animated.Text entering={FadeInRight.delay(300).duration(500)} exiting={FadeOutLeft} className="text-white text-2xl font-bold tracking-[1.5px] leading-9 text-center">
            Stay Updated!
          </Animated.Text>
          <Animated.Text entering={FadeInRight.delay(400).duration(500)} exiting={FadeOutLeft} className="text-white text-xl font-semibold tracking-[1.2px] mb-3 leading-6 text-center">
            Get breaking news directly to your feed
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)} exiting={FadeOutLeft}>
            <TouchableOpacity
              className="bg-red-600 py-4 mx-5 items-center rounded-xl"
              onPress={() => {
                router.replace("/(tabs)");
              }}
            >
              <Text className="text-white text-base font-semibold">Home</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}