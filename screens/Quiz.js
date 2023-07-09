import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
let nextId = 1;
const Quiz = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState();

  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [isLoading, setIsLoading] = useState(false);
  const [over, setOver] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    const url =
      "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
    const res = await fetch(url);
    const data = await res.json();

    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
  };

  useEffect(() => {
    nextId = 1;
    getQuiz();
  }, []);

  const handleNextPress = () => {
    if (ques === 9) {
      navigation.navigate("Results", { score: score });
    } else {
      // let uar = [...score];
      // uar.push({ id: nextId++, score: 0 });
      // setScore(uar);
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    }
  };

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);

    shuffleArray(options);

    return options;
  };

  const handlSelectedOption = (_option) => {
    if (_option === questions[ques].correct_answer) {
      let uar = [...score];

      uar[ques] = 10;
      setScore(uar);
    } else {
      let uar = [...score];
      uar[ques] = 0;

      setScore(uar);
    }

    if (ques === 9) {
      handleShowResult();
    } else {
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    }
  };

  const handleShowResult = () => {
    navigation.navigate("Results", {
      score: score,
    });
  };
  const handleBackPress = () => {
    if (ques === 0) {
      navigation.navigate("Home");
    } else {
      setQues(ques - 1);
      setOptions(generateOptionsAndShuffle(questions[ques - 1]));

    }
  };
  return (
    // <SafeAreaView>
    <View className="items-center justify-around h-full pt-5">
      {questions && (
        <>
          <View className="bg-gray-200 ml-3 mr-3 rounded-xl shadow-black shadow-lg ">
            <Text className="font-bold text-2xl p-3 ">
              Q{ques + 1}. {decodeURIComponent(questions[ques].question)}
            </Text>
          </View>
          <View className="space-y-4 bg-gray-100 w-[350px] h-[350px] items-center justify-around p-10 rounded-xl shadow-black shadow-lg">
            <TouchableOpacity
              className="bg-purple-700 w-[275px] rounded-xl  shadow-black shadow  m-2"
              onPress={() => {
                handlSelectedOption(options[0]);
              }}
            >
              <Text className="text-white text-xl font-bold self-center p-2">
                {decodeURIComponent(options[0])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-purple-700 w-[275px] rounded-xl m-2"
              onPress={() => {
                handlSelectedOption(options[1]);
              }}
            >
              <Text className="text-white text-xl font-bold self-center p-2">
                {decodeURIComponent(options[1])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-purple-700 w-[275px] rounded-xl m-2"
              onPress={() => {
                handlSelectedOption(options[2]);
              }}
            >
              <Text className="text-white text-xl font-bold self-center p-2">
                {decodeURIComponent(options[2])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-purple-700 w-[275px] rounded-xl m-2"
              onPress={() => {
                handlSelectedOption(options[3]);
              }}
            >
              <Text className="text-white text-xl font-bold self-center p-2">
                {decodeURIComponent(options[3])}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row w-full justify-around">
            <TouchableOpacity
              className="bg-purple-700 w-[90px] h-9 rounded-lg  shadow-md"
              onPress={() => handleBackPress()}
            >
              <Text className="text-white text-xl font-bold  self-center m-auto">
                Back
              </Text>
            </TouchableOpacity>
            {over ? (
              <TouchableOpacity className="bg-purple-700 w-[90px] h-9 rounded-lg shadow-md">
                <Text className="text-white text-xl font-bold  self-center m-auto">
                  End
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-purple-700 w-[90px] h-9 rounded-lg shadow-md"
                onPress={handleNextPress}
              >
                <Text className="text-white text-xl font-bold  self-center m-auto">
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>

    //  </SafeAreaView>
  );
};

export default Quiz;
