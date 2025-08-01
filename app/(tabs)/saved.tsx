import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieCard from "@/components/MovieCard";

interface SavedMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const Save = () => {
  const [savedMovies, setSavedMovies] = useState<SavedMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedMovies();
  }, []);

  const loadSavedMovies = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedMovies');
      if (saved) {
        setSavedMovies(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedMovie = async (movieId: number) => {
    try {
      const updatedMovies = savedMovies.filter(movie => movie.id !== movieId);
      setSavedMovies(updatedMovies);
      await AsyncStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
    } catch (error) {
      console.error('Error removing saved movie:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="items-center justify-center flex-1">
          <Text className="text-lg text-white">Loading saved movies...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 px-5">
        <Image source={images.bg} className="absolute z-0 w-full" resizeMode="cover" />
        
        <View className="flex-1 mt-20">
          <View className="flex-row items-center justify-center mb-8">
            <Image source={icons.save} className="w-8 h-8 mr-3" tintColor="#fff" />
            <Text className="text-2xl font-bold text-white">Saved Movies</Text>
          </View>

          {savedMovies.length === 0 ? (
            <View className="items-center justify-center flex-1">
              <Image source={icons.save} className="w-16 h-16 mb-4" tintColor="#666" />
              <Text className="mb-2 text-lg text-center text-gray-400">No saved movies yet</Text>
              <Text className="text-sm text-center text-gray-500">
                Save movies you like to watch them later
              </Text>
            </View>
          ) : (
            <FlatList
              data={savedMovies}
              keyExtractor={(item) => `saved-${item.id}`}
              renderItem={({ item }) => (
                <View className="mb-4" style={{ width: '48%' }}>
                  <MovieCard {...item} />
                  <TouchableOpacity
                    onPress={() => removeSavedMovie(item.id)}
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-2 z-10"
                  >
                    <Text className="text-white text-xs font-bold">×</Text>
                  </TouchableOpacity>
                </View>
              )}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 16,
              }}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Save;