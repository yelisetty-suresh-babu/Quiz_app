import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import Quiz from "./screens/Quiz";
import Results from "./screens/Results";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <View className="items-center justify-center h-full">

    <NavigationContainer>
      {/* <HomeScreen /> */}
      {/* <Quiz /> */}
      {/* <Results /> */}
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Quiz" component={Quiz} options={{headerShown:false}}/>
        <Stack.Screen name="Results" component={Results} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
