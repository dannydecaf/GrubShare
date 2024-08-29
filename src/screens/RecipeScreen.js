// Imports
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Ingredients from "../components/ingredients";
import RecipeList from "../components/recipeList";
import Loading from "../components/loading";
import { fetchRecipeDetails, fetchSimilarRecipes } from "../../api/spoonacular";

var { width, height } = Dimensions.get("window"); // Getting device window dimensions for responsive design
const ios = Platform.OS === "ios"; // Boolean to check if platform is iOS
const topMargin = ios ? "" : "mt-3"; // Conditional top margin based on platform

export default function RecipeScreen() { // Main component for displaying detailed recipe information
  const { params: item } = useRoute(); // Hook to access route object and parameters passed to this screen
  const [isFavourite, toggleFavourite] = useState(false); // State to manage the favorite status
  const navigation = useNavigation(); // Hook to access navigation object for screen transitions
  const [ingredients, setIngredients] = useState([]); // State to store list of ingredients
  const [similarRecipes, setSimilarRecipes] = useState([]); // State to store similar recipes
  const [recipeDetails, setRecipeDetails] = useState(null); // State to store detailed recipe information
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  useEffect(() => {
    fetchRecipeData(item.id); // Fetch recipe data when component mounts or when the item changes
  }, [item]);

  // Function to fetch recipe details and similar recipes
  const fetchRecipeData = async (recipeId) => {
    try {
      setLoading(true); // Show loading indicator
      const details = await fetchRecipeDetails(recipeId); // Fetching detailed recipe information
      const similar = await fetchSimilarRecipes(recipeId); // Fetching similar recipes


      setRecipeDetails(details); // Setting state with fetched recipe details
      setIngredients(details.extendedIngredients || []); // Setting state with ingredients from recipe
      setSimilarRecipes(similar || []); // Setting state with similar recipes
      setLoading(false); // Hide loading indicator
    } catch (error) {
      console.error("Error fetching recipe data: ", error); // Log any errors during fetch
      setLoading(false); // Hide loading indicator
    }
  };

  if (loading || !recipeDetails) {
    return <Loading />; // Show loading indicator if data is still loading or not available
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Back Button & Recipe Picture */}
      <View className="w-full"> {/* Full-width container for the header and image */}
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin // Adjust margin for iOS vs. other platforms
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()} // Navigates back to previous screen
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" /> {/* Back arrow icon */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}> {/* Toggles favorite status */}
            <HeartIcon
              size="35"
              color={isFavourite ? theme.background : "white"} // Changes color based on favorite status
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View> {/* Container for recipe image and overlay */}
          <Image
            source={{ uri: recipeDetails.image }} // Displaying recipe image from details
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {/* Recipe Details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3"> {/* Offset to overlay details on the image */}
        {/* Dish Name */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {recipeDetails.title} {/* Displaying recipe title */}
        </Text>
        {/* Servings and Preparation Time */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Servings: {recipeDetails.servings} • Prep:{" "}
          {recipeDetails.readyInMinutes} mins {/* Displaying servings and preparation time */}
        </Text>

        {/* Cuisine Type */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {recipeDetails.cuisines.join(", ")} {/* Displaying cuisines */}
        </Text>
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full"> {/* Container for nutritional information */}
          <View className="border-r-2 border-r-neutral-400 px-2 items-center"> {/* Calories */}
            <Text className="text-white font-semibold text-lg">kcal</Text>
            <Text className="text-neutral-300 text-lg">
              {Math.round(
                recipeDetails.nutrition.nutrients.find(
                  (n) => n.name === "Calories"
                )?.amount || 0 // Fetching and displaying calories
              )}
            </Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center"> {/* Fat */}
            <Text className="text-white font-semibold text-lg">fat</Text>
            <Text className="text-neutral-300 text-lg">
              {Math.round(
                recipeDetails.nutrition.nutrients.find((n) => n.name === "Fat")
                  ?.amount || 0 // Fetching and displaying fat
              )}
              g
            </Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center"> {/* Carbohydrates */}
            <Text className="text-white font-semibold text-lg">carbs</Text>
            <Text className="text-neutral-300 text-lg">
              {Math.round(
                recipeDetails.nutrition.nutrients.find(
                  (n) => n.name === "Carbohydrates"
                )?.amount || 0 // Fetching and displaying carbohydrates
              )}
              g
            </Text>
          </View>
          <View className="px-2 items-center"> {/* Protein */}
            <Text className="text-white font-semibold text-lg">protein</Text>
            <Text className="text-neutral-300 text-lg">
              {Math.round(
                recipeDetails.nutrition.nutrients.find(
                  (n) => n.name === "Protein"
                )?.amount || 0 // Fetching and displaying protein
              )}
              g
            </Text>
          </View>
        </View>
        {/* Ingredients List */}
        <Ingredients navigation={navigation} ingredients={ingredients} /> {/* Passing ingredients to the Ingredients component */}
        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {recipeDetails.summary.replace(/<\/?[^>]+(>|$)/g, "")} {/* Displaying recipe summary, removing any HTML tags */}
        </Text>
        {/* Instructions */}
        <View className="my-6 mx-4 space-y-2 bg-neutral-800 p-4 rounded-xl"> {/* Container for recipe instructions */}
          <Text className="text-xl text-white font-semibold">Instructions</Text>
          {recipeDetails.analyzedInstructions && recipeDetails.analyzedInstructions.length > 0 ? (
            recipeDetails.analyzedInstructions[0].steps.map((step, index) => ( // Mapping through recipe steps
              <Text key={index} className="text-neutral-300 mb-2">
                Step {index + 1}: {step.step} {/* Displaying each step */}
              </Text>
            ))
          ) : (
            <Text className="text-neutral-400">No instructions available.</Text> // Message if no instructions are available
          )}
        </View>
      </View>
      {/* Similar Recipes */}
      <RecipeList
        title="Similar Recipes" // Title for the list
        hideSeeAll={true} // Hiding "See All" button
        data={similarRecipes} // Passing similar recipes to the RecipeList component
      />
    </ScrollView>
  );
}
