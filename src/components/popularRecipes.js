// Imports
import React from "react";
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../theme";

var { width, height } = Dimensions.get("window");

export default function PopularRecipes({ data }) { // Main component that receives 'data' as props
  const navigation = useNavigation(); // Hook to access navigation object for screen transitions

  return (
    <View className="mb-8 space-y-4"> {/* Container for Popular Recipes section */}
      <View className="mx-4 flex-row justify-between items-center"> 
        <Text className="text-white text-xl">Popular Recipes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PopularRecipesScreen', { data })}> {/* Navigates to full list of popular recipes */}
          <Text style={styles.text} className="text-lg">See All</Text> {/* 'See All' button */}
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => { // Iterates over each recipe item in the data array
          const recipeTitle = item?.title || "No Title"; // Fallback to 'No Title' if title is missing
          const imageUrl = item.image // Constructing URL for the recipe image
            ? `https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}` // Using Spoonacular's image URL format
            : null; // Null if no image is available

          return (
            <TouchableOpacity
              key={index} // Key prop to uniquely identify each recipe item
              onPress={() => navigation.navigate("Recipe", { id: item.id })} // Navigates to the detailed 'Recipe' screen with the relevant recipe's ID
            >
              <View className="space-y-1 mr-4"> {/* Container for each recipe item with margin */}
                {imageUrl ? ( // Checks if image URL exists
                  <Image
                    source={{ uri: imageUrl }} // Displaying recipe image from the URL
                    className="rounded-3xl"
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                      resizeMode: "cover",
                      borderRadius: 15,
                    }}
                  />
                ) : (
                  // Placeholder view for when no image available
                  <View
                    style={{
                      width: width * 0.33, 
                      height: height * 0.22,
                      backgroundColor: "gray",
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: 'white' }}>No Image</Text> {/* Text displayed when no image */}
                  </View>
                )}
                <Text className="text-neutral-300 ml-1">
                  {/* Display recipe title, truncating if it is longer than 14 characters */}
                  {recipeTitle.length > 14 ? recipeTitle.slice(0, 14) + "..." : recipeTitle}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
