import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Modal,
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
import LatestRecipes from "../components/latestRecipes";
import RecipeList from "../components/recipeList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchRandomRecipes, fetchLatestRecipes } from "../../api/spoonacular";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [random, setRandom] = useState([1, 2, 3]);
  const [latest, setLatest] = useState([1, 2, 3]);
  const [bestRated, setBestRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getRandomRecipes();
    getLatestRecipes();
  }, []);

  const getRandomRecipes = async () => {
    try {
      const data = await fetchRandomRecipes();
      console.log("Recipe Data: ", data);
      console.log(data.recipes[0].image); 
      // Log the recipe data structure
      if (data && data.recipes) {
        // Extract image URLs from the data and pass them to the RandomRecipes component
        const imageUrls = data.recipes.map((recipe) => recipe.image);
        setRandom(data.recipes);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching random recipes:", error);
      setLoading(false); // Make sure to set loading to false in case of an error
    }
  };

  const getLatestRecipes = async () => {
    try {
      const data = await fetchLatestRecipes();
      console.log("Latest Recipes Data: ", data);
  
      // Log  image URL of the first latest recipe, if available
      if (data && data.results && data.results.length > 0) {
        console.log(data.results[0].image); 
      }
  
      if (data && data.results) {
        // Extract image URLs from the data and pass them to the LatestRecipes component
        const imageUrls = data.results.map((recipe) => recipe.image);
        setLatest(data.results);
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching latest recipes:", error);
      setLoading(false); // Make sure to set loading to false in case of an error
    }
  };
  

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    setMenuVisible(false); 
    // Redirect to the Login screen
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          {/* Hamburger menu with modal */}
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
      </SafeAreaView>

      {/* Modal for dropdown menu */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            justifyContent: "flex-start",
            paddingTop: ios ? 80 : 100,
            paddingHorizontal: 10,
          }}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View
            style={{
              backgroundColor: "#333", // Darker background for dropdown
              padding: 15,
              borderRadius: 8,
            }}
          >
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Random Recipes Carousel */}
          {random.length > 0 && <RandomRecipes data={random} />}

          {/* Latest Recipes Carousel */}
          {latest.length > 0 && <LatestRecipes data={latest} />}

          {/* Top Rated Recipes Row */}
          <RecipeList title="Top Rated" data={bestRated} />
        </ScrollView>
      )}
    </View>
  );
}

