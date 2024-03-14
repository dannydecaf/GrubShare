import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from '../theme';

export default function recipeList({dish, data}) {
    let recipeName = 'Spaghetti Bolognese';
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
                    <TouchableWithoutFeedback>
                        <Text>
                            {recipeName}
                        </Text>
                    </TouchableWithoutFeedback>
                )
            })
        }
    </ScrollView>
    </View>
  )
}