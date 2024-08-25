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
import { fetchLowCalorieRecipes } from "../../api/spoonacular";

const { width } = Dimensions.get("window");

export default function LowCalorieRecipesScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    if (!hasMore) return;

    const newRecipes = await fetchLowCalorieRecipes(offset);
    if (newRecipes.results.length > 0) {
      setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes.results]);
      setOffset((prevOffset) => prevOffset + 10);
      if (newRecipes.results.length > 10) setHasMore(false);
    } else {
      setHasMore(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#121212" }}>
      <View style={{ padding: 16 }}>
        {/* Back Button */}
        <View style={{ marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
              borderRadius: 10,
              padding: 6,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white", fontSize: 24, marginBottom: 16 }}>
          Under 400 Calories Recipes
        </Text>
        {recipes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Recipe", { id: item.id })}
            style={{ marginBottom: 16 }}
          >
            <Image
              source={{
                uri: `https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}`,
              }}
              style={{
                width: width * 0.9,
                height: width * 0.5,
                borderRadius: 15,
              }}
            />
            <Text style={{ color: "white", fontSize: 18, marginTop: 8 }}>
              {item.title.length > 30
                ? item.title.slice(0, 30) + "..."
                : item.title}
            </Text>
          </TouchableOpacity>
        ))}
        {hasMore && (
          <TouchableOpacity onPress={loadRecipes}>
            <Text style={{ color: "yellow", textAlign: "center", margin: 20 }}>
              Load More
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
