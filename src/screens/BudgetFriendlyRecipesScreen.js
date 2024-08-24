import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const { width } = Dimensions.get("window");

export default function BudgetFriendlyRecipesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  return (
    <ScrollView style={{ backgroundColor: "#121212" }}>
      <View style={{ padding: 16 }}>
        {/* Back Button */}
        <View style={{ marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
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
          Budget-Friendly Recipes
        </Text>
        {data &&
          data.map((item, index) => (
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
      </View>
    </ScrollView>
  );
}
