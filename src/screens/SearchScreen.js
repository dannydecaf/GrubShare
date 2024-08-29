// Imports
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

export default function SearchScreen() { // Main component for  search screen
  const navigation = useNavigation(); // Hook to access navigation object for screen transitions
  const [results, setResults] = useState([]); // State to store search results
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [query, setQuery] = useState(""); // State to store search query
  const [offset, setOffset] = useState(0); // State to manage pagination offset
  const [hasMore, setHasMore] = useState(true); // State to determine if there are more results to load

  // Function to handle the search action
  const handleSearch = async (reset = false) => {
    if (reset) { // If reset flag is true, reset search state
      setOffset(0); // Reset pagination offset
      setHasMore(true); // Reset the hasMore flag
      setResults([]); // Clear previous results
    }

    setLoading(true); // Show loading indicator
    try {
      const searchResults = await searchRecipes(query, offset); // Fetch search results using the API

      if (searchResults.results && searchResults.results.length > 0) { // Check if results are available
        setResults((prevResults) => [...prevResults, ...searchResults.results]); // Append new results to existing list
        setOffset((prevOffset) => prevOffset + 20); // Increment the offset for the next fetch

        if (searchResults.results.length < 20) { // If fewer than 20 results were returned, assume no more data
          setHasMore(false);
        }
      } else {
        setHasMore(false); // Set hasMore to false if no new results were found
      }

      setLoading(false); // Hide loading indicator
    } catch (error) {
      console.error("Error searching recipes:", error); // Log any errors during search
      setResults([]); // Clear results on error
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"> {/* Container for the search bar */}
        <TextInput
          placeholder="Search Recipe" // Placeholder text
          placeholderTextColor={"lightgray"} // Placeholder text color
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          value={query} // Search query value
          onChangeText={setQuery} // Updates query state when text changes
          onSubmitEditing={() => handleSearch(true)} // Initiates search on submit
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")} // Navigates back to Home screen
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" /> {/* Close icon */}
        </TouchableOpacity>
      </View>
      {/* Search Results */}
      {loading ? (
        <Loading /> // Show loading indicator if data is still loading
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length}) {/* Displaying the count of results */}
          </Text>
          <View className="flex-row justify-between flex-wrap"> {/* Container for recipe cards */}
            {results.map((item, index) => { // Iterates over search results to display each one
              return (
                <TouchableWithoutFeedback
                  key={index} // Key prop to uniquely identify each recipe item
                  onPress={() => navigation.push("Recipe", { id: item.id })} // Navigates to  detailed recipe screen with the relevant recipe's ID
                >
                  <View className="space-y-2 mb-4"> {/* Container for each recipe card */}
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
                        ? item.title.slice(0, 22) + "..." // Truncate long titles
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          {hasMore && ( // Conditionally render 'Load More' button if there are more results to load
            <TouchableOpacity
              onPress={() => handleSearch(false)} // Load more results when pressed
              className="mt-4 mb-8"
            >
              <Text className="text-white text-center">Load More</Text> {/* Load More button text */}
            </TouchableOpacity>
          )}
        </ScrollView>
      ) : (
        <View className="flex-row justify-center"> {/* Display image if no results are found */}
          <Image source={require("../assets/grub.png")} className="h-96 w-96" /> {/* Placeholder image */}
        </View>
      )}
    </SafeAreaView>
  );
}
