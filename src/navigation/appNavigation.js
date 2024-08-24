import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen';
import IngredientScreen from '../screens/IngredientScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PopularRecipesScreen from '../screens/PopularRecipesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
                <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
                <Stack.Screen name="Recipe" options={{headerShown: false}} component={RecipeScreen} />
                <Stack.Screen name="Ingredient" options={{headerShown: false}} component={IngredientScreen} />
                <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
                <Stack.Screen name="PopularRecipesScreen" options={{headerShown: false}} component={PopularRecipesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}