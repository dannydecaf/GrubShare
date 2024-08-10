import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import RandomRecipes from "../components/randomRecipes";
import RecipeList from "../components/recipeList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchRandomRecipes } from "../../api/spoonacular";

const ios = Platform.OS === "ios";
export default function HomeScreen() {
  const [random, setRandom] = useState([1, 2, 3]);
  const [newRecipe, setNewRecipe] = useState([1, 2, 3]);
  const [bestRated, setBestRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    getRandomRecipes();
  },[])

  const getRandomRecipes = async () => {
    try {
      const data = await fetchRandomRecipes();
      console.log("Recipe Data: ", data);
      console.log(data.recipes[0].image) 
      // Log the recipe data structure
      if (data && data.recipes) {
        // Extract image URLs from the data and pass them to the RandomRecipes component
        const imageUrls = data.recipes.map(recipe => recipe.image);
        setRandom(data.recipes);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      setLoading(false); // Make sure to set loading to false in case of an error
    }
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    console.log("Menu visibility toggled:", menuVisible);
  };

  const handleLogout = () => {
    console.log("Log Out button pressed");
    // Redirect to the Login screen
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          {/* Hamburger menu with dropdown */}
          <TouchableOpacity onPress={toggleMenu}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>GrubShare</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>

        {/* Dropdown menu for logout */}
        {menuVisible && (
          <View
            style={[
              styles.background,
              {
                position: "absolute",
                top: ios ? 80 : 100,
                left: 10,
                right: 10,
                backgroundColor: "rgba(51, 51, 51, 0.9)",
                padding: 15,
                borderRadius: 8,
                zIndex: 10, // Ensure this is on top of other elements
              },
            ]}
          >
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.text, { fontSize: 16 }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Random Recipes Carousel */}
          {random.length > 0 && <RandomRecipes data={random} />}

          {/* New Recipes Row */}
          <RecipeList title="New" data={newRecipe} />

          {/* Top Rated Recipes Row */}
          <RecipeList title="Top Rated" data={bestRated} />
        </ScrollView>
      )}
    </View>
  );
}
