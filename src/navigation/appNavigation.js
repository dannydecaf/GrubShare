import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import IngredientScreen from '../screens/IngredientScreen';
import RecipeScreen from '../screens/RecipeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
                <Stack.Screen name="Recipe" options={{headerShown: false}} component={RecipeScreen} />
                <Stack.Screen name="Ingredient" options={{headerShown: false}} component={IngredientScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}