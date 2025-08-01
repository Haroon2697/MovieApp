import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from "@/constants/icons";

interface MovieCardProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/300x450/1a1a1a/FFFFFF?text=Movie";

  // Test with a simple image first
  const testImageUrl = "https://via.placeholder.com/300x450/1a1a1a/FFFFFF?text=Movie";
  
  // Temporarily use test image to debug
  const debugImageUrl = "https://picsum.photos/300/450";

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
          vote_average: vote_average || 0,
          release_date: release_date || ''
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
    <View style={{ width: '48%' }}>
      <Link href={`/movies/${id}` as any} asChild>
        <TouchableOpacity>
          <View style={{ 
            width: '100%', 
            height: 220, 
            borderRadius: 8, 
            overflow: 'hidden',
            backgroundColor: '#1a1a1a'
          }}>
            <Image
              source={{ uri: imageUrl }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
              onError={(error) => {
                console.error(`Failed to load image for movie ${id}:`, error.nativeEvent);
                console.error(`Image URL was: ${imageUrl}`);
                setImageError(true);
              }}
              onLoad={() => {
                console.log(`Successfully loaded image for movie ${id}:`, imageUrl);
                setImageError(false);
              }}
              onLoadStart={() => {
                console.log(`Starting to load image for movie ${id}:`, imageUrl);
              }}
              onLoadEnd={() => {
                console.log(`Finished loading image for movie ${id}`);
              }}
            />
          </View>

          <Text className="mt-2 text-sm font-bold text-white" numberOfLines={2} style={{ width: '100%' }}>
            {title}
          </Text>

          <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs font-bold text-white uppercase">
              {vote_average && !isNaN(vote_average) ? Math.round(vote_average / 2) : 'N/A'}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="mt-1 text-xs font-medium text-light-300">
              {release_date?.split("-")[0]}
            </Text>
            <Text className="text-xs font-medium uppercase text-light-300">
              Movie
            </Text>
          </View>
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

export default MovieCard;