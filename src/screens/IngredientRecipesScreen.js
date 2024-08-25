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

export default function IngredientRecipesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { ingredientRecipes } = route.params;

  return (
    <ScrollView style={{ backgroundColor: "#121212" }}>
      <View style={{ padding: 16 }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 16, flexDirection: "row", alignItems: "center" }}
        >
          <ChevronLeftIcon size={24} color="white" />
          <Text style={{ color: "white", fontSize: 18, marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 24, marginBottom: 16 }}>
          Recipes with this Ingredient
        </Text>

        {/* Grid of Recipes */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {ingredientRecipes.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Recipe", { id: item.id })}
              style={{ marginBottom: 16, width: width * 0.45 }}
            >
              <Image
                source={{
                  uri: `https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}`,
                }}
                style={{
                  width: "100%",
                  height: width * 0.3,
                  borderRadius: 15,
                }}
              />
              <Text style={{ color: "white", fontSize: 16, marginTop: 8 }}>
                {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
