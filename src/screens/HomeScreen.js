import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingRecipes from '../components/trendingRecipes';
import RecipeList from '../components/recipeList';

const ios = Platform.OS === 'ios';
export default function HomeScreen() {
    const [trending, setTrending] = useState([1,2,3]);
    const [newRecipe, setNewRecipe] = useState([1,2,3]);
    const [bestRated, setBestRated] = useState([1,2,3]);
    return (
        <View className="flex-1 bg-neutral-800">
            {/* search bar and logo */}
            <SafeAreaView className={ios? "-mb-2": 'mb-3'}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color ="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>GrubShare</Text>
                    </Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
            >
                {/* Trending Recipes Carousel */}
                <TrendingRecipes data={trending} />

                {/* New Recipes Row */}
                <RecipeList title="New" data={newRecipe} />

                {/* Top Rated Recipes Row */}
                <RecipeList title="Top Rated" data={newRecipe} />

            </ScrollView>
        </View>
    )
}