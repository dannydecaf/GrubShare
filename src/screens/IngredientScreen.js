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

    if (ingredientId) {
      getIngredientDetails(ingredientId);
    }
  }, [ingredientId]);

  if (loading || !ingredientDetails) {
    return <Loading />;
  }

  const calculateNutritionalValuesPer10g = () => {
    if (
      !ingredientDetails ||
      !ingredientDetails.nutrition ||
      !ingredientDetails.nutrition.weightPerServing
    ) {
      return null;
    }

    const weightPerServing =
      ingredientDetails.nutrition.weightPerServing.amount;
    const factor = 10 / weightPerServing;

    const nutrients = ingredientDetails.nutrition.nutrients.reduce(
      (acc, nutrient) => {
        if (
          ["Calories", "Fat", "Carbohydrates", "Protein"].includes(
            nutrient.name
          )
        ) {
          acc[nutrient.name] = (nutrient.amount * factor).toFixed(2);
        }
        return acc;
      },
      {}
    );

    return nutrients;
  };

  const nutritionalValuesPer10g = calculateNutritionalValuesPer10g();

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
        {/* Ingredient Image */}
        <View>
          <Image
            source={{
              uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredientDetails.image}`,
            }}
            style={{
              width,
              height: height * 0.35,
              borderRadius: 15,
              resizeMode: "contain",
            }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>

        {/* Ingredient Name */}
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            {ingredientDetails.name}
          </Text>
        </View>

        {/* Nutritional Information */}
        <View className="my-6 mx-4 space-y-2 bg-neutral-800 p-4 rounded-xl">
          <Text className="text-xl text-white font-semibold">
            Nutritional Information (per 10g)
          </Text>
          <Text className="text-neutral-300">
            Calories: {nutritionalValuesPer10g?.Calories || 0} kcal
          </Text>
          <Text className="text-neutral-300">
            Fat: {nutritionalValuesPer10g?.Fat || 0} g
          </Text>
          <Text className="text-neutral-300">
            Carbohydrates: {nutritionalValuesPer10g?.Carbohydrates || 0} g
          </Text>
          <Text className="text-neutral-300">
            Protein: {nutritionalValuesPer10g?.Protein || 0} g
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
