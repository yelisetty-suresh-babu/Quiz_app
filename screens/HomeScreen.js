import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Quiz from "./Quiz";

const HomeScreen = ({navigation}) => {
  // const navigation=useNavigation();
  return (
    // <SafeAreaView >
      <View className="items-center h-full justify-around bg-white">
        <View>
          <Text className="text-[50px] font-bold">Quizzler</Text>
        </View>
        <Image
          source={require("../assets/quiz.jpeg")}
          className="h-80 w-80 object-contain"
        />
        <TouchableOpacity className="bg-purple-700 w-32 h-10 rounded-lg" onPress={()=>{
          navigation.navigate('Quiz')
        }}> 
          <Text className="text-[25px] font-bold self-center m-auto text-white" >Start</Text>
        </TouchableOpacity>
      </View>
    // </SafeAreaView>
  );
};

export default HomeScreen;
