import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import category from "@/constants/category";

export default function Categories({ categoryy }: { categoryy: (slug: string) => void }) {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [active, setActive] = useState(0);

  const handleSelect = (index: number) => {
    const selected = itemRef.current[index];
    setActive(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    });

    categoryy(category[index].slug);
  };

  return (
    <View>
      <Text className="text-lg font-semibold text-white mb-3 ml-5">
        Trending Right Now
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        contentContainerClassName="gap-[20px] py-[10] px-[20px] mb-[10px]"
      >
        {category.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`border-[1px] border-gray-800 py-3 px-4 rounded-xl ${
              active === index ? "bg-red-600" : ""
            }`}
            ref={(e) => (itemRef.current[index] = e)}
            onPress={() => handleSelect(index)}
          >
            <Text className="text-white text-base tracking-wider">
              {item.title}{" "}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
