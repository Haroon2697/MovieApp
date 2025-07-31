import { View, Text, ImageBackground } from 'react-native'
import { images } from '@/constants/images'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
            title:"Home",
            headerShown:false,
            tabBarIcon:({focused})=>(
               
              <>
                <ImageBackground
                source={images.highlight}
                className="flex-row items-center justify-center"
                >
                    <images source={images.home} tintColor="#151312" className='size-5'/>
                    <Text>Home</Text>
                </ImageBackground>

                </>
            )
            }}/>

        <Tabs.Screen name="search" options={{
            title:"Search",
            headerShown:false
            }}/>
            
            <Tabs.Screen name="saved" options={{
                title:"Saved",
                headerShown:false
                }}/>
                
                
        <Tabs.Screen name="profile" options={{
            title:"Profile",
            headerShown:false
            }}/>

            
    </Tabs>
  )
}

export default _layout