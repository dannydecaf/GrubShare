import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import RecipeList from "../components/recipeList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function IngredientScreen() {
  const [isFavourite, toggleFavourite] = useState(false);
  const [ingredientRecipes, setIngredientRecipes] = useState([1,2,3,4]);
  const navigation = useNavigation();
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Back Button */}
      <SafeAreaView
        className={
          "absolute z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin
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
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Ingredient Details */}
      <View>
        <View>
          <Image
            source={require("../assets/pancetta.jpeg")}
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
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Pancetta
          </Text>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-neutral-400 tracking-wide">
            Pancetta is Italian cured pork belly – the equivalent of streaky
            bacon. It has a deep, strong, slightly salty flavour, is fairly
            fatty, and comes either smoked or unsmoked. You can buy pancetta
            either as straight rashers (which tend to be smoked), as round
            slices cut from a roll (which tend to be unsmoked), or diced. If you
            need diced pancetta, it's cheaper to buy rashers and cut them
            yourself, although the cubes won't be as thick if you do this.
          </Text>
        </View>

        {/* Recipes that Ingredient is used in */}
        <RecipeList title={'Recipes that use this ingredient'}data={ingredientRecipes} />
      </View>
    </ScrollView>
  );
}
