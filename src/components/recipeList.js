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
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");

export default function recipeList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
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
          // Safely handle missing or undefined item and title
          const recipeTitle = item?.title || "No Title"; // Use optional chaining to check if item and title exist

          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Recipe", item)}
            >
              <View className="space-y-1 mr-4">
                {item.image ? (
                  <Image
                    source={{ uri: item.image }} // Use the actual image URL
                    className="rounded-3xl"
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                      resizeMode: "cover",
                    }} // Proper scaling
                  />
                ) : (
                  <View
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                      backgroundColor: "gray",
                      borderRadius: 15,
                    }}
                  />
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
