import { View, Text,Platform, StatusBar } from 'react-native'
import React from 'react'

const profile = () => {
  return (
    <View 
      className="flex-1"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <Text>profile</Text>
    </View>
  )
}

export default profile