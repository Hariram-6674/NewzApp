import { Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { NewzType } from "@/types";
import Loading from "./Loading";
import { Link } from "expo-router";
export default function NewsList({ newslist }: { newslist: NewzType[] }) {
  return (
    <View className="my-5 mb-12">
      {newslist.length == 0 ? (
        <Loading size={"large"} />
      ) : (
        newslist.map((item, index) => (
          <Link href={`../news/${item.article_id}`} asChild key={index}>
            <TouchableOpacity>
              <NewsItem item={item}/>
            </TouchableOpacity>
          </Link>
        ))
      )}
    </View>
  );
}

export const NewsItem = ({item}:{item:NewzType}) => {
  return (
    <View className="flex-row items-center mb-5 flex-1 ml-3 gap-3">
      <Image
        source={{ uri: item.image_url }}
        className="w-[90px] h-[100px] rounded-2xl mr-3"
      />
      <View className="flex-1 gap-3 justify-between">
        <Text className="text-gray-400 text-sm capitalize">
          {item.category}
        </Text>
        <Text className="text-sm text-white font-semibold ">{item.title}</Text>
        <View className="flex-row gap-2 items-center">
          <Image source={{uri:item.source_icon}} className="h-5 w-5 rounded-3xl"/>
          <Text className="text-gray-400 font-normal">{item.source_name}</Text>
        </View>
      </View>
    </View>
  );
};
