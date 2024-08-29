// Imports
import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); // Getting device window dimensions for responsive styling

export default function FeaturedRecipes({ data }) { // Main component that receives 'data' as props
  const navigation = useNavigation(); // Hook to access navigation object for navigating between screens

  // Function to handle click on a recipe item, navigates to the 'Recipe' screen with the relevant item
  const handleClick = (item) => {
    navigation.navigate('Recipe', item); // Navigates to the 'Recipe' screen, passing the clicked item as parameter
  };

  // Log image URLs for debugging purposes to ensure correct data is passed
  if (data && data.recipes) { // Checks if data and recipes exist
    const recipes = data.recipes; // Accessing list of recipes from data
    console.log(data.recipes[0].image); // Logging image URL of the first recipe
    recipes.forEach((recipe, index) => { // Iterating through each recipe to log its image URL
      console.log(`Image URL for Recipe ${index + 1}: ${recipe.image}`);
    });
  }

  // Return null if there is no data or data array is empty, preventing the component from rendering
  if (!data || data.length === 0) {
    return null; // Early return to handle empty or undefined data gracefully
  }

  return (
    <View style={{ marginBottom: 8 }}> {/* Container for Featured section */}
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 4, marginBottom: 5 }}>Featured</Text>
      <Carousel
        data={data} // Passing the recipe data to the carousel
        renderItem={({ item }) => ( // Function to render each item in the carousel
          <RecipeCard item={item} handleClick={handleClick} /> // Using a separate RecipeCard component for each recipe
        )}
        firstItem={1} // Sets initial slide index to 1
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width * 0.60}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}

// Separate component for rendering individual recipe cards
const RecipeCard = ({ item, handleClick }) => {
  const imageUrl = item.image; // Accessing image URL from recipe item

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}> {/* Handles click events on the recipe card */}
      {imageUrl ? ( // Checks if image URL exists
        <Image
          source={{ uri: imageUrl }} // Displaying recipe image from the URL
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 20,
            resizeMode: 'cover',
          }}
        />
      ) : (
        // Placeholder view for when no image is available
        <View style={{ width: width * 0.6, height: height * 0.4, backgroundColor: 'gray', borderRadius: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>No Image Available</Text> {/* Text displayed when there's no image */}
        </View>
      )}
    </TouchableWithoutFeedback>
  );
}
