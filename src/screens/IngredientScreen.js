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
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import RecipeList from "../components/recipeList";
import Loading from "../components/loading";
import { fetchIngredientDetails } from "../../api/spoonacular";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function IngredientScreen() {
  const [isFavourite, toggleFavourite] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState(null);
  const [ingredientRecipes, setIngredientRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { ingredientId } = route.params;

  useEffect(() => {
    getIngredientDetails(ingredientId);
  }, [ingredientId]);

  const getIngredientDetails = async (id) => {
    try {
      setLoading(true);
      const details = await fetchIngredientDetails(id);
      setIngredientDetails(details);
      setIngredientRecipes(details.recipes || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ingredient details: ", error);
      setLoading(false);
    }
  };

  if (loading || !ingredientDetails) {
    return <Loading />;
  }

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
            source={{ uri: ingredientDetails.image }}
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
            {ingredientDetails.name}
          </Text>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-neutral-400 tracking-wide">
            {ingredientDetails.description || "No description available."}
          </Text>
        </View>
        {/* Recipes that Ingredient is used in */}
        <RecipeList
          title={"Recipes that use this ingredient"}
          data={ingredientRecipes}
        />
      </View>
    </ScrollView>
  );
}
