// Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens used in navigation stack
import HomeScreen from '../screens/HomeScreen';
import IngredientScreen from '../screens/IngredientScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PopularRecipesScreen from '../screens/PopularRecipesScreen';
import HealthyRecipesScreen from '../screens/HealthyRecipesScreen';
import BudgetFriendlyRecipesScreen from '../screens/BudgetFriendlyRecipesScreen';
import LowCalorieRecipesScreen from '../screens/LowCalorieRecipesScreen';
import IngredientRecipesScreen from '../screens/IngredientRecipesScreen';

// Creating stack navigator
const Stack = createNativeStackNavigator();

export default function AppNavigation() { // Main navigation component for the app
    return (
        <NavigationContainer> {/* Provides navigation context for all navigators */}
            <Stack.Navigator> {/* Stack navigator to manage screen transitions */}
                {/* Defining each screen in the stack */}
                <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} /> {/* Login screen */}
                <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} /> {/* Registration screen */}
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} /> {/* Home screen */}
                <Stack.Screen name="Recipe" options={{headerShown: false}} component={RecipeScreen} /> {/* Recipe details screen */}
                <Stack.Screen name="Ingredient" options={{headerShown: false}} component={IngredientScreen} /> {/* Ingredient details screen */}
                <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} /> {/* Search screen */}
                <Stack.Screen name="PopularRecipesScreen" options={{headerShown: false}} component={PopularRecipesScreen} /> {/* Popular recipes screen */}
                <Stack.Screen name="HealthyRecipesScreen" options={{headerShown: false}} component={HealthyRecipesScreen} /> {/* Healthy recipes screen */}
                <Stack.Screen name="BudgetFriendlyRecipesScreen" options={{headerShown: false}} component={BudgetFriendlyRecipesScreen} /> {/* Budget-friendly recipes screen */}
                <Stack.Screen name="LowCalorieRecipesScreen" options={{headerShown: false}} component={LowCalorieRecipesScreen} /> {/* Low-calorie recipes screen */}
                <Stack.Screen name="IngredientRecipesScreen" options={{headerShown: false}} component={IngredientRecipesScreen} /> {/* Recipes by ingredient screen */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
