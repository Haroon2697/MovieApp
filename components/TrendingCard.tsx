import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

interface TrendingCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
  index: number;
}

const TrendingCard = ({
  movie: { id, title, poster_path },
  index,
}: TrendingCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/300x450/1a1a1a/FFFFFF?text=Movie";

  useEffect(() => {
    checkIfSaved();
  }, []);

  const checkIfSaved = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedMovies');
      if (saved) {
        const savedMovies = JSON.parse(saved);
        setIsSaved(savedMovies.some((movie: any) => movie.id === id));
      }
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const toggleSave = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedMovies');
      let savedMovies = saved ? JSON.parse(saved) : [];
      
      if (isSaved) {
        // Remove from saved
        savedMovies = savedMovies.filter((movie: any) => movie.id !== id);
      } else {
        // Add to saved with proper data structure
        const movieData = {
          id,
          title,
          poster_path,
          vote_average: 0, // Default for trending movies
          release_date: ''
        };
        savedMovies.push(movieData);
      }
      
      await AsyncStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  return (
    <View className="relative w-32 pl-5">
      <Link href={`/movies/${id}` as any} asChild>
        <TouchableOpacity>
          <View style={{ 
            width: 128, 
            height: 192, 
            borderRadius: 8, 
            overflow: 'hidden',
            backgroundColor: '#1a1a1a'
          }}>
            <Image
              source={{ uri: imageUrl }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
              onError={(error) => {
                console.error(`Failed to load trending image for movie ${id}:`, error.nativeEvent);
                setImageError(true);
              }}
              onLoad={() => {
                console.log(`Successfully loaded trending image for movie ${id}:`, imageUrl);
                setImageError(false);
              }}
            />
          </View>

          <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
            <MaskedView
              maskElement={
                <Text className="text-6xl font-bold text-white">{index + 1}</Text>
              }
            >
              <Image
                source={images.rankingGradient}
                className="size-14"
                resizeMode="cover"
              />
            </MaskedView>
          </View>

          <Text
            className="mt-2 text-sm font-bold text-light-200"
            numberOfLines={2}
            style={{ maxWidth: 128 }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </Link>
      
      {/* Save Button - Outside Link */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          toggleSave();
        }}
        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 z-10"
      >
        <Image 
          source={icons.save} 
          className="w-4 h-4" 
          tintColor={isSaved ? "#ff6b6b" : "#fff"} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default TrendingCard;