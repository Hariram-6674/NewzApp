import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import category from "@/constants/category";
import Checkbox from "@/components/Checkbox";
import { NewsCategorySelect } from "@/hooks/NewsCategorySelect";
import { CountryCategorySelect } from "@/hooks/CountryCateforySelect";
import { Link } from "expo-router";

export default function discover() {
  const { categ, toggle } = NewsCategorySelect();
  const { categcount, togglecount } = CountryCategorySelect();
  const [query, setQuery] = useState("");
  const [category, setcategorySearch] = useState("");
  const [countries, setcountrySearch] = useState("");
  return (
    <SafeAreaView className="flex-1 px-5 bg-[#1A1A1A]">
      <Search horipad={false} searchQuery={setQuery} />
      <Text className="text-[18px] font-semibold text-white mb-2">
        Category
      </Text>
      <View className="flex-row flex-wrap gap-4 mt-3 mb-5">
        {categ.map((item) => (
          <Checkbox
            key={item.id}
            label={item.title}
            checked={item.selected}
            onPress={() => {
              toggle(item.id);
              setcategorySearch(item.slug);
            }}
          />
        ))}
      </View>
      <Text className="text-[18px] font-semibold text-white mb-2">Country</Text>
      <View className="flex-row flex-wrap gap-4 mt-3 mb-5">
        {categcount.map((item, index) => (
          <Checkbox
            key={index}
            label={item.name}
            checked={item.selected}
            onPress={() => {
              togglecount(index);
              setcountrySearch(item.code);
            }}
          />
        ))}
      </View>
      <Link
        href={{
          pathname: "/news/search",
          params: { query: query, category, countries }
        }}
        asChild
      >
        <TouchableOpacity className="bg-red-600 items-center p-3 rounded-xl my-3">
          <Text className="text-white text-base font-semibold">Search</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}
