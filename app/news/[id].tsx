import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NewzType } from "@/types";
import axios from "axios";
import Loading from "@/components/Loading";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function NewsDeets() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [newss, setNewss] = useState<NewzType[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookit, setBookit] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (!loading) {
      renderBook(newss[0].article_id);
    }
  }, [loading]);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNewss(response.data.results);
        setLoading(false);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const saved = async (newsID: string) => {
    setBookit(true);
    const token = await AsyncStorage.getItem("bookit");
    const res = token ? JSON.parse(token) : [];
    if (!res.includes(newsID)) {
      res.push(newsID);
      await AsyncStorage.setItem("bookit", JSON.stringify(res));
    }
  };

  const removeSaved = async (newsID: string) => {
    setBookit(false);
    const token = await AsyncStorage.getItem("bookit");
    const res = token ? JSON.parse(token) : [];
    const updatedBookit = res.filter((id: string) => id !== newsID);
    await AsyncStorage.setItem("bookit", JSON.stringify(updatedBookit));
  };

  const renderBook = async (newsID: string) => {
    const token = await AsyncStorage.getItem("bookit");
    const res = token ? JSON.parse(token) : [];
    const data = res.find((value: string) => value === newsID);
    setBookit(data != null);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                bookit
                  ? removeSaved(newss[0].article_id)
                  : saved(newss[0].article_id)
              }
            >
              <Ionicons
                name={bookit ? "bookmark" : "bookmark-outline"}
                size={22}
                color={bookit ? "#dc2626" : "white"}
              />
            </TouchableOpacity>
          ),
          title: "",
          headerStyle: {
            backgroundColor: "#1A1A1A",
          },
          headerShadowVisible: false,
        }}
      />
      <View className="flex-1 bg-[#1A1A1A]">
        {loading ? (
          <Loading size="large" />
        ) : (
          <ScrollView className="flex-1" bounces={false}>
            <View className="relative">
              <Image
                source={{ uri: newss[0].image_url }}
                className="w-full h-[300px]"
                style={{ resizeMode: "cover" }}
              />
              <LinearGradient
                colors={["transparent", "rgba(26, 26, 26, 1)"]}
                className="absolute bottom-0 left-0 right-0 h-[100px]"
              />
            </View>

            <View className="px-4 -mt-10">
              <View className="bg-[#252525] p-4 rounded-2xl shadow-lg">
                <View className="flex-row items-center space-x-2 mb-3">
                  <Image
                    source={{ uri: newss[0].source_icon }}
                    className="h-6 w-6 rounded-full border mr-2 border-gray-600"
                  />
                  <Text className="text-gray-300 font-medium">
                    {newss[0].source_name}
                  </Text>
                  <Text className="ml-[310px] absolute text-gray-400 text-sm">
                    {Moment(newss[0].pubDate).format("MMM DD, YYYY")}
                  </Text>
                </View>

                <Text className="text-white text-2xl font-bold tracking-wide leading-tight mb-4">
                  {newss[0].title}
                </Text>

                <View className="h-[1px] bg-gray-800 my-2" />

                <Text
                  className="text-gray-300 leading-relaxed"
                  style={{ fontSize: 16 }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  iaculis, ligula non suscipit rutrum, justo dolor pellentesque
                  mi, vel sollicitudin tortor diam nec lacus. Integer
                  pellentesque, libero a sodales iaculis, lacus nunc vestibulum
                  est, ac condimentum neque quam sit amet quam. In eget orci sed
                  metus lacinia pulvinar ac sit amet tellus. Nullam volutpat
                  massa ipsum, in dignissim dolor porttitor non. Vestibulum
                  posuere enim ut nulla euismod, eu elementum massa pulvinar.
                  Morbi vel risus eget ex sodales tristique nec non velit. Ut
                  posuere, turpis at sodales laoreet, purus tortor venenatis
                  libero, sed aliquam arcu diam in magna. Vestibulum vitae
                  turpis et turpis dapibus tristique eu at risus. Vivamus id
                  risus eros. Sed dictum diam ac ultricies tempus. Pellentesque
                  fermentum, arcu vel accumsan tincidunt, nunc lorem posuere
                  lorem, eget consequat velit nibh sit amet mauris. Curabitur
                  cursus ultrices dolor. In hac habitasse platea dictumst. Duis
                  convallis justo ex, et scelerisque massa dictum vitae.
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Fusce ac blandit orci.
                  Phasellus molestie, lacus lacinia ullamcorper volutpat, mauris
                  ipsum egestas tellus, quis vehicula sapien urna ut eros. Etiam
                  tortor quam, rutrum nec sollicitudin id, malesuada ut neque.
                  Sed tempus sit amet tortor eget suscipit. Nam nisl nisi,
                  mollis eu accumsan ac, luctus nec magna. Ut ligula leo,
                  dignissim posuere dictum nec, cursus vitae felis. Aenean nisl
                  magna, finibus quis quam a, elementum dignissim lorem. Nam est
                  enim, condimentum sit amet dolor vel, ultrices accumsan erat.
                  Aenean ullamcorper commodo condimentum. Ut bibendum nunc eu
                  velit ultrices, at lacinia est egestas. Nunc rutrum ultrices
                  nulla, eu mattis arcu commodo ut. Nunc semper tempor justo
                  vitae aliquam. Nulla et faucibus ante.
                </Text>
              </View>
            </View>

            <View className="h-10" />
          </ScrollView>
        )}
      </View>
    </>
  );
}
