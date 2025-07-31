import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'

const saved = () => {
  return (
    <View style={{ 
      flex: 1,
      backgroundColor: 'white',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }}>
      <Text>saved</Text>
    </View>
  )
}

export default saved