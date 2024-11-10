import { View, TouchableOpacity, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack } from "expo-router";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewsList";
import { useIsFocused } from "@react-navigation/native";
import { NewzType } from "@/types";

export default function saved() {
  const [bookit, setBookit] = useState<NewzType[]>([]);
  const [loading, setLoading] = useState(true);
  const focused = useIsFocused();

  useEffect(() => {
    fetchBooks();
  }, [focused]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("bookit");
      const res = token ? JSON.parse(token) : null;

      if (res && Array.isArray(res) && res.length > 0) {
        const query = res.join(",");
        if (query.length > 0) {
          const response = await axios.get(
            `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query}`
          );
          const books = response.data.results || [];
          setBookit(books);
        } else {
          setBookit([]);
        }
      } else {
        setBookit([]);
      }
    } catch (error) {
      setBookit([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#1A1A1A",
          },
        }}
      />
      <View className="flex-1 pt-5 bg-[#1A1A1A]">
        {loading ? (
          <Loading size={"large"} />
        ) : bookit.length === 0 ? (
          <View className="flex-1 justify-center items-center px-4">
            <Text className="text-white text-lg font-semibold text-center mb-4">
              You haven't saved any articles
            </Text>
            <Text className="text-gray-400 text-base text-center">
              It looks like you haven't saved any articles yet. Start saving
              your favorites to view them here.
            </Text>
          </View>
        ) : (
          <FlatList
            data={bookit}
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item }) => {
              return (
                <Link
                  href={`../news/${item.article_id as string}`}
                  asChild
                  key={index}
                >
                  <TouchableOpacity>
                    <NewsItem item={item} />
                  </TouchableOpacity>
                </Link>
              );
            }}
          />
        )}
      </View>
    </>
  );
}
