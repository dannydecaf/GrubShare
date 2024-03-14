import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
var {width, height} = Dimensions.get('window');

export default function recipeList({dish, data}) {
    let recipeName = 'Spaghetti Bolognese';
    const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
      <Text className="text-white text-xl">{dish}</Text>
      <TouchableOpacity>
        <Text style={styles.text} className="text-lg">See All</Text>
      </TouchableOpacity>
    </View>
    {/* Recipe Row */}
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal: 15}}
    >
        {
            data.map((item, index)=>{
                return (
                    <TouchableWithoutFeedback
                    key={index}
                    onPress={()=> navigation.navigate('Recipe', item)}>

                      <View className="space-y-1 mr-4">
                        <Image
                        source={require('../assets/beefwellington.jpg')}
                        className="rounded-3xl"
                        style={{width: width*0.33, height: height*0.22}}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {
                          recipeName.length>14? recipeName.slice(0,14)+'...': recipeName
                          }
                        </Text>
                        </View>


                    </TouchableWithoutFeedback>
                )
            })
        }
    </ScrollView>
    </View>
  )
}