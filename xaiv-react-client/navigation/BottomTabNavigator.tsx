import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import DecideScreen from '../screens/DecideScreen/DecideScreen';
import { BottomTabParamList, HomeParamList, MessagesParamList, ProfileParamList, DecideParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({route, navigation} : any) {
  const colorScheme = useColorScheme();
  const globals = route.params;
  console.log("BottomTabNavigator.tsx", globals)
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
        initialParams={globals}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="message" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="account" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Decide"
        component={DecideNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="account" color={color} />,
        }}
        initialParams={globals}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator({route, navigation} : any) {
  const globals = route.params;
  console.log("HomeNavigator", globals)
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={globals}
      />
    </HomeStack.Navigator>
  );
}

const MessagesStack = createStackNavigator<MessagesParamList>();

function MessagesNavigator() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
    </MessagesStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

const DecideStack = createStackNavigator<DecideParamList>();

function DecideNavigator({route, navigation} : any) {
  const globals = route.params;
  console.log("decNavigator", globals)
  return (
    <DecideStack.Navigator>
      <DecideStack.Screen
        name="DecideScreen"
        component={DecideScreen}
        options={{ headerShown: false }}
        initialParams={globals}
      />
    </DecideStack.Navigator>
  );
}
