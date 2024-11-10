import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar, View, Keyboard, Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TabIcon = ({
  Source,
  focused,
}: {
  Source: React.ComponentType<any>;
  focused: boolean;
}) => (
  <View className={`flex flex-row justify-center items-center rounded-full `}>
    <View
      className={`rounded-full w-14 h-14 items-center justify-center ${
        focused ? "bg-red-600" : ""
      }`}
    >
      <Source />
    </View>
  </View>
);

export default function Layout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: isKeyboardVisible ? { display: 'none' } : {
          backgroundColor: "#333333",
          borderRadius: 50,
          overflow: "hidden",
          marginHorizontal: 50,
          marginBottom: 20,
          height: 74,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          borderColor: "#333333",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              Source={() => <AntDesign name="home" size={28} color="white" />}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              Source={() => <AntDesign name="find" size={28} color="white" />}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              Source={() => (
                <MaterialCommunityIcons
                  name="bookmark-multiple"
                  size={28}
                  color="white"
                />
              )}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}