// Imports
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

var { width } = Dimensions.get("window"); // Getting device window width for responsive design

export default function Ingredients({ ingredients }) { // Main component that receives ingredients as props
  const navigation = useNavigation(); // Hook to access navigation object for screen transitions

  return (
    <View className="mx-4 mt-6"> {/* Container for the Ingredients section with margin */}
      <Text className="text-white text-xl mb-4">Ingredients</Text>
      {ingredients.map((ingredient, index) => ( // Iterates over each ingredient in the ingredients array
        <TouchableOpacity
          key={index} // Key prop to uniquely identify each ingredient item
          onPress={() =>
            navigation.navigate('Ingredient', { ingredientId: ingredient.id })} // Navigates to the Ingredient screen with the relevant ingredient ID
          className="flex-row items-center mb-4"
        >
          <Image
            source={{
              uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`, // Constructing URL for ingredient image
            }}
            style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }}
          />
          <View className="flex-1"> {/* Container for ingredient details with flexible width */}
            <Text className="text-white text-lg font-semibold"> {/* Ingredient name */}
              {ingredient.name}
            </Text>
            <Text className="text-neutral-400 text-sm"> {/* Description of ingredient */}
              {ingredient.original}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
