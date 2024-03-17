import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function Ingredients({ ingredients, navigation }) {
  let ingredientName = "Pancetta";
  let servingAmount = "100g";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Ingredients</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {ingredients && ingredients.map((ingredient, index) => {
            return (
              <TouchableOpacity key={index} className="mr-4 items-center" onPress={()=> navigation.navigate('Ingredient', ingredient)}>
                <View
                className="overflow-hidden rounded-full h-20 w-20 iterms-center border border-neutral-500">
                <Image
                className="rounded-2xl h-24 w-20"
                source={require('../assets/pancetta.jpeg')}
                />
                </View>

                <Text className="text-neutral-400 text-xs mt-1">
                  {ingredientName.length > 10
                    ? ingredientName.slice(0, 10) + "..."
                    : ingredientName}
                </Text>
                <Text className="text-white text-xs mt-1">
                  {servingAmount.length > 5
                    ? servingAmount.slice(0, 5) + "..."
                    : servingAmount}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
