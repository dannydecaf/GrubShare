import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function PopularRecipesScreen() {
    return (
        <ScrollView>
            <View>
                <Text style={{ color: 'white', fontSize: 24 }}>Popular Recipes</Text>
            </View>
        </ScrollView>
    )
}