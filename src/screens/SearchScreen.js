import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { searchRecipes } from "../../api/spoonacular";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = async (reset = false) => {
    if (reset) {
      setOffset(0);
      setHasMore(true);
      setResults([]);
    }

    setLoading(true);
    try {
      const searchResults = await searchRecipes(query, offset);

      console.log("Search Results:", searchResults);
      if (searchResults.results && searchResults.results.length > 0) {
        setResults((prevResults) => [...prevResults, ...searchResults.results]);
        setOffset((prevOffset) => prevOffset + 20);

        if (searchResults.results.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setResults([]);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Recipe"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => handleSearch(true)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {/* Search Results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Recipe", { id: item.id })}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: `https://spoonacular.com/recipeImages/${item.id}-636x393.${item.imageType}`,
                      }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                        marginVertical: 10,
                      }}
                    />
                    <Text
                      className="text-neutral-300 ml-l"
                      style={{ textAlign: "center" }}
                    >
                      {item.title.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          {hasMore && (
            <TouchableOpacity
              onPress={() => handleSearch(false)}
              className="mt-4 mb-8"
            >
              <Text className="text-white text-center">Load More</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image source={require("../assets/grub.png")} className="h-96 w-96" />
        </View>
      )}
    </SafeAreaView>
  );
}
