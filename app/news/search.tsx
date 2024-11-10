import { View, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { NewzType } from "@/types";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewsList";

export default function search() {
  const { query, categorySearch, countrySearch } = useLocalSearchParams<{
    query: string;
    categorySearch: string;
    countrySearch: string;
  }>();
  const [newss, setNewss] = useState<NewzType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      let querystr = "";
      if (query){
        querystr = `&q=${query}`
      }
      const category = categorySearch && categorySearch.length > 0 ? categorySearch : "top";
      const country = countrySearch && countrySearch.length > 0 ? countrySearch : "in";

      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&category=${category}&country=${country}${querystr}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNewss(response.data.results);
        setLoading(false);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color={"white"} />
            </TouchableOpacity>
          ),
          title: "Search",
          headerStyle: {
            backgroundColor: '#1A1A1A'
          },
        }}
      />
      <View className="flex-1 p-5 bg-[#1A1A1A]">
        {loading ? (
            <Loading size={"large"} />
        ) : (
          <FlatList
            data={newss}
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
