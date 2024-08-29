// Imports
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
import FeaturedRecipes from "../components/featuredRecipes";
import PopularRecipes from "../components/popularRecipes";
import HealthyRecipes from '../components/healthyRecipes';
import BudgetFriendlyRecipes from '../components/budgetFriendlyRecipes';
import LowCalorieRecipes from "../components/lowCalorieRecipes";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchFeaturedRecipes, fetchPopularRecipes, fetchHealthyRecipes, fetchBudgetFriendlyRecipes, fetchLowCalorieRecipes } from "../../api/spoonacular";

const ios = Platform.OS === "ios"; // Boolean to check if platform is iOS

export default function HomeScreen() { // Main component for home screen
  const [featured, setFeatured] = useState([]); // State to store featured recipes
  const [popular, setPopular] = useState([]); // State to store popular recipes
  const [healthy, setHealthy] = useState([]); // State to store healthy recipes
  const [budgetFriendly, setBudgetFriendly] = useState([]); // State to store budget-friendly recipes
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const [menuVisible, setMenuVisible] = useState(false); // State to control the visibility of menu modal
  const [lowCalorie, setLowCalorie] = useState([]); // State to store low-calorie recipes
  const navigation = useNavigation(); // Hook to access navigation object for screen transitions

  useEffect(() => {
    getRecipes(); // Load recipes when the component mounts
  }, []);

  // Function to fetch all recipe categories
  const getRecipes = async () => {
    try {
      setLoading(true); // Show loading indicator

      // Fetch data for each recipe category
      const featuredData = await fetchFeaturedRecipes();
      const popularData = await fetchPopularRecipes();
      const healthyData = await fetchHealthyRecipes();
      const budgetFriendlyData = await fetchBudgetFriendlyRecipes();
      const lowCalorieData = await fetchLowCalorieRecipes();

      // Update state with fetched data
      setFeatured(featuredData.recipes || []);
      setPopular(popularData.results || []);
      setHealthy(healthyData.results || []);
      setBudgetFriendly(budgetFriendlyData.results || []);
      setLowCalorie(lowCalorieData.results || []);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error); // Log any errors during fetch
      setLoading(false);
    }
  };

  // Function to toggle visibility of the dropdown menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Function to handle user logout and navigate to the login screen
  const handleLogout = () => {
    setMenuVisible(false); 
    navigation.navigate("Login");
  };

  // Function to navigate to "See All" screens for each recipe category
  const navigateToSeeAll = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Header with search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          {/* Hamburger menu button to toggle modal */}
          <TouchableOpacity onPress={toggleMenu}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" /> {/* Hamburger icon */}
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>GrubShare</Text> {/* App logo/title */}
          </Text>
          {/* Search button to navigate to the Search screen */}
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" /> {/* Search icon */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal for dropdown menu */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)} // Closes modal on request
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-start",
            paddingTop: ios ? 80 : 100,
            paddingHorizontal: 10,
          }}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)} // Closes the modal when tapping outside
        >
          <View
            style={{
              backgroundColor: "#333",
              padding: 15,
              borderRadius: 8,
            }}
          >
            {/* Logout button */}
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {loading ? (
        <Loading /> // Show loading indicator while fetching data
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Featured Recipes Carousel */}
          {featured.length > 0 && <FeaturedRecipes data={featured} />}

          {/* Popular Recipes Row */}
          <PopularRecipes data={popular} seeAll={() => navigateToSeeAll('PopularRecipesScreen')} />

          {/* Healthy Recipes Carousel */}
          {healthy.length > 0 && <HealthyRecipes data={healthy} seeAll={() => navigateToSeeAll('HealthyRecipesScreen')} />}

          {/* Budget-Friendly Recipes Carousel */}
          {budgetFriendly.length > 0 && (
            <BudgetFriendlyRecipes data={budgetFriendly} seeAll={() => navigateToSeeAll('BudgetFriendlyRecipesScreen')} />
          )}

          {/* Low Calorie Recipes Carousel */}
          {lowCalorie.length > 0 && <LowCalorieRecipes data={lowCalorie} seeAll={() => navigateToSeeAll('LowCalorieRecipesScreen')} />}
        </ScrollView>
      )}
    </View>
  );
}
