import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SwipeScreen from '../screens/DecideScreen/SwipeScreen';
import TopicScreen from '../screens/DecideScreen/TopicScreen';

export default function Navigation({ colorScheme, globals }: any ) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator globals={globals} />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(globals: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} initialParams={globals.globals} />
      <Stack.Screen name="Root" component={BottomTabNavigator} initialParams={globals.globals} />
      <Stack.Screen name="Swipe" component={SwipeScreen} initialParams={globals.globals} />
      <Stack.Screen name="Topic" component={TopicScreen} initialParams={globals.globals} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
