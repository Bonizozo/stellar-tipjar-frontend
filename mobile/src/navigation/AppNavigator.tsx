import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { CreatorScreen } from '../screens/CreatorScreen';
import { TipScreen } from '../screens/TipScreen';

export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  Creator: { username: string };
  Tip: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Creator" component={CreatorScreen} />
        <Stack.Screen name="Tip" component={TipScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
