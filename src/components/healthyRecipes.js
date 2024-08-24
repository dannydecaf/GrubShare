import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function HealthyRecipes({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Recipe', item);
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 4, marginBottom: 5 }}>Health Kick</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <RecipeCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width * 0.60}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}

const RecipeCard = ({ item, handleClick }) => {
  const imageUrl = item.image; // Assuming item.image contains the URL of the image

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 20, // Adjust border radius as needed
          }}
        />
      ) : (
        <View style={{ width: width * 0.6, height: height * 0.4, backgroundColor: 'gray', borderRadius: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>No Image Available</Text>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};
