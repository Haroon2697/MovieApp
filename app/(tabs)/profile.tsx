import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';

const Profile = () => {
  const profileOptions = [
    { icon: icons.person, title: "Edit Profile", subtitle: "Update your information" },
    { icon: icons.save, title: "Saved Movies", subtitle: "View your saved movies" },
    { icon: icons.search, title: "Search History", subtitle: "Your recent searches" },
    { icon: icons.star, title: "Favorites", subtitle: "Your favorite movies" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 px-5">
        <Image source={images.bg} className="absolute z-0 w-full" resizeMode="cover" />
        
        <ScrollView className="flex-1 mt-20" showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-gray-600 rounded-full items-center justify-center mb-4">
              <Image source={icons.person} className="w-12 h-12" tintColor="#fff" />
            </View>
            <Text className="text-2xl font-bold text-white mb-2">Movie Lover</Text>
            <Text className="text-gray-400 text-sm">movie.lover@example.com</Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around mb-8 bg-dark-100 rounded-lg p-4">
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">12</Text>
              <Text className="text-gray-400 text-sm">Saved Movies</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">45</Text>
              <Text className="text-gray-400 text-sm">Watched</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">8</Text>
              <Text className="text-gray-400 text-sm">Favorites</Text>
            </View>
          </View>

          {/* Profile Options */}
          <View className="space-y-4">
            {profileOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center bg-dark-100 rounded-lg p-4"
                onPress={() => {
                  // Handle option press
                  console.log(`Pressed: ${option.title}`);
                }}
              >
                <View className="w-10 h-10 bg-accent rounded-lg items-center justify-center mr-4">
                  <Image source={option.icon} className="w-5 h-5" tintColor="#fff" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold text-lg">{option.title}</Text>
                  <Text className="text-gray-400 text-sm">{option.subtitle}</Text>
                </View>
                <Text className="text-gray-400 text-lg">›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <View className="mt-8 mb-4">
            <Text className="text-center text-gray-500 text-sm">
              MovieApp v1.0.0
            </Text>
            <Text className="text-center text-gray-500 text-xs mt-1">
              Powered by TMDB API
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;