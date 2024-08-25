import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

var { width } = Dimensions.get("window");

export default function Ingredients({ ingredients }) {
  const navigation = useNavigation();

  return (
    <View className="mx-4 mt-6">
      <Text className="text-white text-xl mb-4">Ingredients</Text>
      {ingredients.map((ingredient, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("IngredientScreen", {
              ingredientId: ingredient.id,
            })
          }
          className="flex-row items-center mb-4"
        >
          <Image
            source={{
              uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
            }}
            style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }}
          />
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold">
              {ingredient.name}
            </Text>
            <Text className="text-neutral-400 text-sm">
              {ingredient.original}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
