import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

const ios = Platform.OS === 'ios';
export default function HomeScreen() {
    return (
        <View className="flex-1 bg-neutral-800">
            {/* search bar and logo */}
            <SafeAreaView className={ios? "-mb-2": 'mb-3'}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color ="white" />
                    <Text className="text-white text-3xl font-bold">
                        GrubShare
                    </Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}