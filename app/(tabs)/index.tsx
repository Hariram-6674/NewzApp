import { ScrollView, StatusBar, Text, View, RefreshControl, Platform } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { NewzType } from "@/types";
import Breaking from "@/components/Breaking";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';

export default function HomeScreen() {
  const [breakingNewz, setBreakingNewz] = useState<NewzType[]>([]);
  const [newss, setNewss] = useState<NewzType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setupInitialData();
    setupNavigationBar();
  }, []);

  const setupInitialData = async () => {
    await Promise.all([getBreaking(), getNews()]);
  };

  const getBreaking = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&country=in&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNewz(response.data.results);
        setLoading(false);
      }
    } catch (err: any) {
      console.log("Error fetching breaking news:", err);
    }
  };

  const setupNavigationBar = async () => {
    if (Platform.OS === 'android') {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBackgroundColorAsync("transparent");
    }
  };

  const getNews = async (category: string = "") => {
    try {
      const categoryString = category ? `&category=${category}` : "";
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en${categoryString}&image=1&size=10`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNewss(response.data.results);
        setLoading(false);
      }
    } catch (err: any) {
      console.log("Error fetching news:", err);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([getBreaking(), getNews()]);
    setRefreshing(false);
  }, []);

  const Catchange = (category: string) => {
    setNewss([]);
    getNews(category);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1A1A1A]">
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
          />
        }
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <Header />
        
        <View className="px-4 mb-6">
          <Text className="text-white text-2xl font-bold">
            Your Daily News Update
          </Text>
        </View>

        {loading ? (
          <Loading size="large" />
        ) : (
          <>
            <Breaking news={breakingNewz} />
            <Categories categoryy={Catchange} />
            <NewsList newslist={newss} />
          </>
        )}
        
        <View className="h-16" />
      </ScrollView>
    </SafeAreaView>
  );
}