import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

export default function recipeList({ title, data, hideSeeAll, onSeeAllPress }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={{ color: 'yellow', fontSize: 16 }}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Recipe Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          // Handle missing or undefined item and title
          const recipeTitle = item?.title || "No Title"; // Check if item and title exist

          // Construct image URL
          const imageUrl = `https://spoonacular.com/recipeImages/${item.id}-636x393.${item.imageType}`;

          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Recipe", item)}
            >
              <View className="space-y-1 mr-4">
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }} // Use constructed image URL
                    className="rounded-3xl"
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                      resizeMode: "cover", // Proper scaling
                      borderRadius: 15, // Ensure rounded corners
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
                  {recipeTitle.length > 14
                    ? recipeTitle.slice(0, 14) + "..."
                    : recipeTitle}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

