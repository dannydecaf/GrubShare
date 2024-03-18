import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';

var {width, height} = Dimensions.get('window');

export default function RandomRecipes({data}) {
  const navigation = useNavigation();
  const handleClick = (item)=>{
    navigation.navigate('Recipe', item);
  }
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Random</Text>
      <Carousel
      data={data}
      renderItem={({item})=> <RecipeCard item={item} handleClick={handleClick} />}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.60}
      slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  )
}

const RecipeCard = ({item, handleClick})=>{
  return (
    <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
      <Image source={require('../assets/carbonara.jpg')}
      style={{
        width: width*0.6,
        height: height*0.4
      }}
      className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  )
}