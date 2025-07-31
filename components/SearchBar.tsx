import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface SearchBarProps {
  onPress?: () => void;
  placeholder?: string;
}

const SearchBar = ({ onPress, placeholder = "Search" }: SearchBarProps) => {
  return (
    <View className='flex-row items-center px-5 py-4 rounded-full bg-dark-200'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff' />
        <TextInput
        onPressIn={onPress}
        placeholder={placeholder}
        value=''
        placeholderTextColor='#ab8bff'
        className='flex-1 ml-2 text-sm text-light-200'
        />
    </View>
  )
}

export default SearchBar