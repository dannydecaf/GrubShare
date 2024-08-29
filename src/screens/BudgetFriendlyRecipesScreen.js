//Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { fetchBudgetFriendlyRecipes } from '../../api/spoonacular';

const { width } = Dimensions.get("window"); // Getting device window width for responsive design

export default function BudgetFriendlyRecipesScreen() { // Main component for budget-friendly recipes screen
  const navigation = useNavigation(); // Hook to access navigation object for screen transitions
  const [recipes, setRecipes] = useState([]); // State to store list of recipes
  const [offset, setOffset] = useState(0); // State to manage pagination offset
  const [hasMore, setHasMore] = useState(true); // State to determine if there are more recipes to load

  useEffect(() => {
    loadRecipes(); // Load recipes when component mounts
  }, []);

  // Function to load more recipes, managing pagination and checking for more data
  const loadRecipes = async () => {
    if (!hasMore) return; // If there are no more recipes, exit early

    const newRecipes = await fetchBudgetFriendlyRecipes(offset); // Fetch new recipes using current offset
    if (newRecipes.results.length > 0) { // Check if new recipes were returned
      setRecipes(prevRecipes => [...prevRecipes, ...newRecipes.results]); // Append new recipes to the existing list
      setOffset(prevOffset => prevOffset + 10); // Increment the offset for the next fetch
      if (newRecipes.results.length < 10) setHasMore(false); // If fewer than 10 recipes were returned, there are no more to load
    } else {
      setHasMore(false); // No more recipes available
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#121212" }}> {/* Main scrollable container with dark background */}
      <View style={{ padding: 16 }}>
        {/* Back Button */}
        <View style={{ marginBottom: 16 }}> {/* Container for the back button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()} // Navigates back to the previous screen
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 10,
              padding: 6,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" /> {/* Back arrow icon */}
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white", fontSize: 24, marginBottom: 16 }}>
          Budget-Friendly Recipes
        </Text> {/* Screen title */}
        {recipes.map((item, index) => ( // Iterates over list of recipes to display each one
          <TouchableOpacity
            key={index} // Key prop to uniquely identify each recipe item
            onPress={() => navigation.navigate("Recipe", { id: item.id })} // Navigates to the detailed recipe screen with the relevant recipe's ID
            style={{ marginBottom: 16 }}
          >
            <Image
              source={{
                uri: `https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}`, // Displaying recipe image using constructed URL
              }}
              style={{
                width: width * 0.9,
                height: width * 0.5,
                borderRadius: 15,
              }}
            />
            <Text style={{ color: "white", fontSize: 18, marginTop: 8 }}>
              {/* Display recipe title, truncating if it is longer than 30 characters */}
              {item.title.length > 30
                ? item.title.slice(0, 30) + "..."
                : item.title}
            </Text>
          </TouchableOpacity>
        ))}
        {hasMore && ( // Conditionally render the 'Load More' button if there are more recipes to load
          <TouchableOpacity onPress={loadRecipes}>
            <Text style={{ color: 'yellow', textAlign: 'center', margin: 20 }}>Load More</Text> {/* Load more button */}
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
