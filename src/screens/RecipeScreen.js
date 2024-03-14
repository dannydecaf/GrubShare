import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function RecipeScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  let recipeName = "Spaghetti Carbonara";
  useEffect(() => {
    //Call the Receip details API
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Back Button & Recipe Picture */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require("../assets/carbonara.jpg")}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {/* Recipe Details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* Dish */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {recipeName}
        </Text>
        {/* Upload Date, Preparation Time */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          25/02/2022 • Prep: 35 mins
        </Text>

        {/* Cuisine Type */}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Italian
          </Text>
        {/* Ingredients */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
          100g pancetta • 50g pecorino cheese • 50g parmesan • 3 large eggs • 350g spaghetti • 2 plump garlic cloves, peeled and left whole • 50g unsalted butter • sea salt and freshly ground black pepper
          </Text>
        {/* Description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
          Discover how to make traditional spaghetti carbonara. This classic Italian pasta dish combines a silky cheese sauce with crisp pancetta and black pepper.
          </Text>
      </View>
    </ScrollView>
  );
}
