import React from "react";
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../theme";

var { width, height } = Dimensions.get("window");

export default function BudgetFriendlyRecipes({ data }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">Budget-Friendly Recipes</Text>
        <TouchableOpacity onPress={() => {/* Handle See All navigation */}}>
          <Text style={styles.text} className="text-lg">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          const recipeTitle = item?.title || "No Title";
          const imageUrl = item.image
            ? `https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}`
            : null;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Recipe", { id: item.id })}
            >
              <View className="space-y-1 mr-4">
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    className="rounded-3xl"
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                      resizeMode: "cover",
                      borderRadius: 15,
                    }}
                  />
                ) : (
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
                    <Text style={{ color: 'white' }}>No Image</Text>
                  </View>
                )}
                <Text className="text-neutral-300 ml-1">
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
