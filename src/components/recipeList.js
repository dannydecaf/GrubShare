// Imports
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

export default function RecipeList({ title, data, hideSeeAll, onSeeAllPress }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4"> {/* Container for Recipe List section */}
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && ( // Conditional rendering of 'See All' button
          <TouchableOpacity onPress={onSeeAllPress}> {/* Calls a custom function when 'See All' is pressed */}
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
        {data.map((item, index) => { // Iterates over each recipe item in the data array
          const recipeTitle = item?.title || "No Title"; // Fallback to 'No Title' if the title is missing
          
          // Construct image URL using recipe ID and image type
          const imageUrl = `https://spoonacular.com/recipeImages/${item.id}-636x393.${item.imageType}`;

          return (
            <TouchableWithoutFeedback
              key={index} // Key prop to uniquely identify each recipe item
              onPress={() => navigation.push("Recipe", item)} // Navigates to the 'Recipe' screen, passing the relevant item
            >
              <View className="space-y-1 mr-4"> {/* Container for each recipe item with margin */}
                {imageUrl ? ( // Checks if image URL exists
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
                  // Placeholder view for when no image is available
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
                    <Text style={{ color: 'white' }}>No Image</Text> {/* Text displayed when there's no image */}
                  </View>
                )}
                <Text className="text-neutral-300 ml-1">
                  {/* Display recipe title, truncating if it is longer than 14 characters */}
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
