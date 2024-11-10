import { View, Text, Dimensions, useWindowDimensions, ViewToken, ViewabilityConfig } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NewzType } from "@/types";
import Slider from "./Slider";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import Page from "./Page";

export default function Breaking({ news }: { news: NewzType[] }) {
  const [data, setData] = useState<NewzType[]>(() => [
    ...news.slice(-1),
    ...news,
    ...news.slice(0, 1),
  ]);
  const [page, setPage] = useState(1);
  const scroll = useSharedValue(0);
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();
  const flatListRef = useAnimatedRef<Animated.FlatList<NewzType>>();
  const [autoplay, setAutoplay] = useState(true);
  const autoplayIntervalRef = useRef<NodeJS.Timeout>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scroll.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      offset.value = event.contentOffset.x;
    },
  });

  // Move infinite scroll logic to a worklet
  const handleInfiniteScrollJS = useCallback(() => {
    'worklet';
    const totalWidth = width * (data.length - 1);
    
    if (offset.value <= 0) {
      offset.value = width * (data.length - 2);
      scrollTo(flatListRef, offset.value, 0, false);
    } else if (offset.value >= totalWidth) {
      offset.value = width;
      scrollTo(flatListRef, offset.value, 0, false);
    }
  }, [width, data.length]);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        const nextOffset = offset.value + width;
        offset.value = nextOffset;
        scrollTo(flatListRef, nextOffset, 0, true);
      }, 5000);
    }

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [autoplay, width]);

  useDerivedValue(() => {
    scrollTo(flatListRef, offset.value, 0, true);
    handleInfiniteScrollJS();
  });

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300,
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (viewableItems[0]?.index !== undefined) {
      const realIndex = viewableItems[0].index! - 1;
      setPage(realIndex >= 0 ? realIndex % news.length : news.length - 1);
    }
  }, [news.length]);

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged }
  ]);

  return (
    <View className="mb-3">
      <Text className="text-white ml-5 mb-3 font-bold text-lg">
        Breaking News
      </Text>
      <View className="justify-center">
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => `news-item-${index}`}
          renderItem={({ item, index }) => (
            <Slider 
              item={item} 
              index={index} 
              scroll={scroll} 
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          initialScrollIndex={1}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          onScrollBeginDrag={() => setAutoplay(false)}
          onScrollEndDrag={() => {
            handleInfiniteScrollJS();
            setAutoplay(true);
          }}
          onMomentumScrollEnd={() => {
            handleInfiniteScrollJS();
          }}
        />
        <Page 
          item={news} 
          pageindex={page} 
          scroll={scroll} 
        />
      </View>
    </View>
  );
}