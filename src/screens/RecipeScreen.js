import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios? '': 'mt-3';

export default function RecipeScreen() {
    const {params: item} = useRoute();
    useEffect(()=>{
        //Call the Receip details API
    },[item])

  return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        className="flex-1 bg-neutral-900"
        >
            {/* Back Button & Recipe Poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " +topMargin}>
                    <TouchableOpacity style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <HeartIcon size="35" color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
    </ScrollView>
  )
}