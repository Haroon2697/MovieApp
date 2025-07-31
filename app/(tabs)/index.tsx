import { Link,useRouter } from "expo-router";
import { ScrollView, Text, View, Image, Dimensions } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

export default function Index() {
  const router = useRouter();
  return (
 <View className="flex-1 bg-primary">
<Image source={images.bg} className="absolute z-0 w-full" />
<ScrollView className="flex-1 px-5" 
showsVerticalScrollIndicator={false}
contentContainerStyle={{
  minHeight: Dimensions.get("window").height,
  paddingBottom:10,
}}
>
  <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
<View className="flex-row items-center justify-between">
  
<SearchBar onPress={()=>router.push("/search")}
placeholder="Search Movies"

/>
</View>
</ScrollView>
 </View>
  );
}
