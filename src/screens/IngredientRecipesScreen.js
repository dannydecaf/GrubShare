// Imports
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const { width } = Dimensions.get("window");

export default function IngredientRecipesScreen() { // Main component to display recipes containing a specific ingredient
  const navigation = useNavigation(); // Hook to access navigation object for screen transitions
  const route = useRoute(); // Hook to access the route object and parameters passed to this screen
  const { ingredientRecipes } = route.params; // Destructuring ingredientRecipes from route parameters

  return (
    <ScrollView style={{ backgroundColor: "#121212" }}>
      <View style={{ padding: 16 }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Navigates back to the previous screen
          style={{ marginBottom: 16, flexDirection: "row", alignItems: "center" }}
        >
          <ChevronLeftIcon size={24} color="white" /> {/* Back arrow icon */}
          <Text style={{ color: "white", fontSize: 18, marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 24, marginBottom: 16 }}>
          Recipes with this Ingredient
        </Text> {/* Screen title */}

        {/* Grid of Recipes */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}> {/* Grid layout for recipe cards */}
          {ingredientRecipes.map((item, index) => ( // Iterates over list of recipes passed as a parameter
            <TouchableOpacity
              key={index} // Key prop to uniquely identify each recipe item
              onPress={() => navigation.navigate("Recipe", { id: item.id })} // Navigates to detailed recipe screen with the relevant recipe's ID
              style={{ marginBottom: 16, width: width * 0.45 }}
            >
              <Image
                source={{
                  uri: `https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}`, // Displaying recipe image using  constructed URL
                }}
                style={{
                  width: "100%",
                  height: width * 0.3,
                  borderRadius: 15,
                }}
              />
              <Text style={{ color: "white", fontSize: 16, marginTop: 8 }}>
                {/* Display recipe title, truncating if it is longer than 20 characters */}
                {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
