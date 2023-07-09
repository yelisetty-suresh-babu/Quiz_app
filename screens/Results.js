import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Results = ({ route }) => {
  const { score } = route.params;

  const [scor, setScor] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    let v = 0;
    for (let i = 0; i < 10; i++) {
      v += score[i];
    }

    setScor(v);
  }, []);
  // let scor = 0;
  return (
    <SafeAreaView>
      <View className="items-center justify-around h-full bg-white top-10">
        <View className="mb-4">
          <Text className="text-3xl font-bold">Results</Text>
        </View>
        {scor >= 50 ? (
          <Image
            source={require("../assets/winner.jpeg")}
            className="rounded-xl h-80 w-80 object-contain bottom-10 animate-bounce"
          />
        ) : (
          <Image
            source={require("../assets/loser.jpeg")}
            className="rounded-xl h-80 w-80 object-contain bottom-10"
          />
        )}
        <View className="h-[250px] bg-purple-500 w-[90%] bottom-10 rounded-lg">
          <View className="items-center  h-full w-full p-4">
            <Text className="text-4xl font-semibold">Score:</Text>
            <Text className="font-extrabold text-[80px] m-auto">
              {scor}/100
            </Text>
            <Text className="mb-2 font-bold text-2xl">
              {scor < 50 ? "Better Luck next Time" : "Congratulations"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-purple-700 w-[90px] h-9 rounded-lg shadow-md bottom-9"
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text className="text-white text-xl font-bold  self-center m-auto">
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Results;
