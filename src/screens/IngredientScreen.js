// Imports
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import RecipeList from "../components/recipeList";
import Loading from "../components/loading";
import { fetchIngredientDetails, fetchRecipesByIngredient } from "../../api/spoonacular";

var { width, height } = Dimensions.get("window"); // Getting device window dimensions for responsive design
const ios = Platform.OS == "ios"; // Boolean to check if the platform is iOS
const verticalMargin = ios ? "" : "my-3"; // Margin adjustment for iOS vs. other platforms

export default function IngredientScreen() { // Main component for displaying ingredient details and related recipes
  const [isFavourite, toggleFavourite] = useState(false); // State to manage favorite status
  const [ingredientDetails, setIngredientDetails] = useState(null); // State to store ingredient details
  const [ingredientRecipes, setIngredientRecipes] = useState([]); // State to store recipes that use this ingredient
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const navigation = useNavigation(); // Hook to access navigation object for screen transitions
  const route = useRoute(); // Hook to access route object and parameters passed to this screen
  const { ingredientId } = route.params; // Destructuring ingredientId from route parameters

  useEffect(() => {
    // Function to fetch ingredient details and related recipes
    const getIngredientDetails = async (id) => {
      try {
        setLoading(true);
        const details = await fetchIngredientDetails(id); // Fetching ingredient details by ID
        const recipes = await fetchRecipesByIngredient(details.name); // Fetching recipes that use this ingredient
        setIngredientDetails(details); // Setting ingredient details state
        setIngredientRecipes(recipes || []); // Setting recipes state or empty array if none found
        setLoading(false); // Hide loading indicator
      } catch (error) {
        console.error("Error fetching ingredient details: ", error); // Log any errors during fetch
        setLoading(false); // Hide loading indicator
      }
    };

    if (ingredientId) {
      getIngredientDetails(ingredientId); // Fetch details if ingredientId is provided
    }
  }, [ingredientId]); // Dependency array includes ingredientId to re-run the effect if it changes

  if (loading || !ingredientDetails) {
    return <Loading />; // Show loading indicator if data is still loading or not available
  }

  // Function to calculate nutritional values per 10 grams based on ingredient's serving size
  const calculateNutritionalValuesPer10g = () => {
    if (
      !ingredientDetails ||
      !ingredientDetails.nutrition ||
      !ingredientDetails.nutrition.weightPerServing
    ) {
      return null; // Return null if nutritional data is missing
    }

    const weightPerServing = ingredientDetails.nutrition.weightPerServing.amount; // Get the weight per serving from ingredient details
    const factor = 10 / weightPerServing; // Calculate factor to adjust values to 10 grams

    const nutrients = ingredientDetails.nutrition.nutrients.reduce(
      (acc, nutrient) => { // Reducing the nutrients array to extract and calculate relevant values
        if (
          ["Calories", "Fat", "Carbohydrates", "Protein"].includes(nutrient.name)
        ) {
          acc[nutrient.name] = (nutrient.amount * factor).toFixed(2); // Calculate and format values per 10 grams
        }
        return acc; // Return accumulated values
      },
      {} // Initial accumulator is an empty object
    );

    return nutrients; // Return calculated nutritional values
  };

  const nutritionalValuesPer10g = calculateNutritionalValuesPer10g(); // Get nutritional values per 10 grams

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Back Button */}
      <SafeAreaView
        className={
          "absolute z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin // Adjust margin for iOS vs. other platforms
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Navigates back to the previous screen
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" /> {/* Back arrow icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}> {/* Toggles favorite status */}
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} /> {/* Favorite icon with dynamic color */}
        </TouchableOpacity>
      </SafeAreaView>
      
      {/* Ingredient Details */}
      <View>
        {/* Ingredient Image */}
        <View>
          <Image
            source={{
              uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredientDetails.image}`, // Displaying ingredient image using the constructed URL
            }}
            style={{
              width,
              height: height * 0.35,
              borderRadius: 15,
              resizeMode: "contain",
            }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>

        {/* Ingredient Name */}
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            {ingredientDetails.name} {/* Displaying ingredient name */}
          </Text>
        </View>

        {/* Nutritional Information */}
        <View className="my-6 mx-4 space-y-2 bg-neutral-800 p-4 rounded-xl"> {/* Container for nutritional information */}
          <Text className="text-xl text-white font-semibold">
            Nutritional Information (per 10g)
          </Text>
          <Text className="text-neutral-300">
            Calories: {nutritionalValuesPer10g?.Calories || 0} kcal {/* Displaying calculated calories */}
          </Text>
          <Text className="text-neutral-300">
            Fat: {nutritionalValuesPer10g?.Fat || 0} g {/* Displaying calculated fat */}
          </Text>
          <Text className="text-neutral-300">
            Carbohydrates: {nutritionalValuesPer10g?.Carbohydrates || 0} g {/* Displaying calculated carbohydrates */}
          </Text>
          <Text className="text-neutral-300">
            Protein: {nutritionalValuesPer10g?.Protein || 0} g {/* Displaying calculated protein */}
          </Text>
        </View>

        {/* Recipes that Ingredient is used in */}
        <RecipeList
          title={"Recipes that use this ingredient"} // Title for the recipe list
          data={ingredientRecipes} // Data for recipes that use the ingredient
          hideSeeAll={false}
          onSeeAllPress={() => { // Function to handle "See All" button press
            if (ingredientRecipes.length > 0) {
              navigation.navigate("IngredientRecipesScreen", {
                ingredientRecipes, // Navigating to a screen that shows all recipes using the ingredient
              });
            } else {
              console.log("No recipes found for this ingredient."); // Log if no recipes are available
            }
          }}
        />
      </View>
    </ScrollView>
  );
}
