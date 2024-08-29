// Imports
import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress'; // A library for displaying progress indicators
import { theme } from '../theme'; // Importing custom theme settings, presumably containing color values

// Getting device window dimensions for responsive design
var { width, height } = Dimensions.get("window");

export default function Loading() { // Main component for displaying a loading indicator
  return (
    <View style={{ height, width }} className="absolute flex-row justify-center items-center"> 
      {/* Full-screen container centered with absolute positioning */}
      <Progress.CircleSnail 
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
}
