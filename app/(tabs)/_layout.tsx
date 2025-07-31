import { View, Text, ImageBackground, Image } from 'react-native'

import { images } from '@/constants/images'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '@/constants/icons'

const TabIcon = ( {focused,icon,label}:{focused:boolean,icon:string,label:string} ) => {
    return (

        <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
                >
                    <Image source={icons.home} tintColor="#151312" className='size-5'/>
                    <Text className='ml-2 text-base font-semibold text-secondary'>{label}</Text>
                </ImageBackground>
    )
}

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
            title:"Home",
            headerShown:false,
            tabBarIcon:({focused})=>(
          <TabIcon focused={focused} icon={icons.home} label="Home"/>
            )
            }}/>

        <Tabs.Screen name="search" options={{
            title:"Search",
            headerShown:false,
            tabBarIcon:({focused})=>(
                <TabIcon focused={focused} icon={icons.search} label="Search"/>
                )
            }}/>
            
            <Tabs.Screen name="saved" options={{
                title:"Saved",
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <TabIcon focused={focused} icon={icons.save} label="Saved"/>
                    )
                }}/>
                
                
        <Tabs.Screen name="profile" options={{
            title:"Profile",
            headerShown:false,
            tabBarIcon:({focused})=>(
                <TabIcon focused={focused} icon={icons.person} label="Profile"/>
                )
            }}/>

            
    </Tabs>
  )
}

export default _layout