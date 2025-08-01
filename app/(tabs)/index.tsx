import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import React from 'react';
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => fetchMovies({ query: "" }));

  // Use the first 5 movies as trending movies
  const trendingMoviesData = trendingMovies ? trendingMovies.slice(0, 5) : [];

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  // Debug: Log the first movie data
  React.useEffect(() => {
    if (movies && movies.length > 0) {
      console.log("First movie data:", movies[0]);
      console.log("Poster path:", movies[0].poster_path);
      console.log("Full image URL:", `https://image.tmdb.org/t/p/w500${movies[0].poster_path}`);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 w-full"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="self-center mt-10"
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />

            {trendingMoviesData && trendingMoviesData.length > 0 && (
              <View className="mt-10">
                <Text className="mb-3 text-lg font-bold text-white">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mt-3 mb-4"
                  data={trendingMoviesData}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard key={`trending-card-${item.id}-${index}`} movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `trending-${item.id}-${index}`}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="mt-5 mb-3 text-lg font-bold text-white">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard key={`movie-card-${item.id}`} {...item} />}
                keyExtractor={(item) => `movie-${item.id}`}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 16,
                }}
                className="pb-32 mt-2"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;