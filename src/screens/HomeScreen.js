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
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchFeaturedRecipes, fetchPopularRecipes, fetchHealthyRecipes, fetchBudgetFriendlyRecipes } from "../../api/spoonacular";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);
  const [healthy, setHealthy] = useState([]);
  const [budgetFriendly, setBudgetFriendly] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      setLoading(true);

      const featuredData = await fetchFeaturedRecipes();
      const popularData = await fetchPopularRecipes();
      const healthyData = await fetchHealthyRecipes();
      const budgetFriendlyData = await fetchBudgetFriendlyRecipes();

      setFeatured(featuredData.recipes || []);
      setPopular(popularData.results || []);
      setHealthy(healthyData.results || []);
      setBudgetFriendly(budgetFriendlyData.results || []);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    setMenuVisible(false); 
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
          {/* Featured Recipes Carousel */}
          {featured.length > 0 && <FeaturedRecipes data={featured} />}

          {/* Popular Recipes Row */}
          <PopularRecipes data={popular} />

          {/* Healthy Recipes Carousel */}
          {healthy.length > 0 && <HealthyRecipes data={healthy} />}

          {/* Budget-Friendly Recipes Carousel */}
          {budgetFriendly.length > 0 && (
            <BudgetFriendlyRecipes data={budgetFriendly} />
          )}
        </ScrollView>
      )}
    </View>
  );
}
