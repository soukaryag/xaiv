import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Image, View } from 'react-native'
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import DecideScreen from '../screens/DecideScreen/DecideScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { BottomTabParamList, HomeParamList, MessagesParamList, ProfileParamList, DecideParamList, CalendarParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({ route, navigation }: any) {
  const colorScheme = useColorScheme();
  const globals = route.params;
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: "red", style: styles.container }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="home" color={"#bbbbbb"} size={30} focused={focused} />,
          tabBarLabel: ({}) => <Text></Text>,
        }}
        initialParams={globals}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="message-circle" color={"#bbbbbb"} size={30} focused={focused} />,
          tabBarLabel: ({}) => <Text></Text>,
        }}
        initialParams={globals}
      />
      <BottomTab.Screen
        name="Decide"
        component={DecideNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="plus-circle" color={"#bbbbbb"} size={30} focused={focused} />,
          tabBarLabel: ({}) => <Text></Text>,
        }}
        initialParams={globals}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="calendar" color={"#bbbbbb"} size={30} focused={focused} />,
          tabBarLabel: ({}) => <Text></Text>,
        }}
        initialParams={globals}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="user" color={"#bbbbbb"} size={30} focused={focused} />,
          tabBarLabel: ({}) => <Text></Text>,
        }}
        initialParams={globals}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string; size: number, focused: boolean}) {
  return <Feather style={{ marginBottom: -3 }} {...props} />
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator({ route, navigation }: any) {
  const globals = route.params;
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

function MessagesNavigator({ route, navigation }: any) {
  const globals = route.params;
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{ headerShown: false }}
        initialParams={globals}
      />
    </MessagesStack.Navigator>
  );
}

const DecideStack = createStackNavigator<DecideParamList>();

function DecideNavigator({ route, navigation }: any) {
  const globals = route.params;
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

const CalendarStack = createStackNavigator<CalendarParamList>();

function CalendarNavigator({ route, navigation }: any) {
  const globals = route.params;
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ headerShown: false }}
        initialParams={globals}
      />
    </CalendarStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator({ route, navigation }: any) {
  const globals = route.params;
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
        initialParams={globals}
      />
    </ProfileStack.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    borderTopColor: "rgba(0,0,0,0)",
  }
})