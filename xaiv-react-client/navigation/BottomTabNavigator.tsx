import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'
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
  // console.log("BottomTabNavigator.tsx", globals)
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, style: styles.container }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={"#bbbbbb"} size={30} />,
        }}
        initialParams={globals}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="message-circle" color={"#bbbbbb"} size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Decide"
        component={DecideNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={"#bbbbbb"} size={30} />,
        }}
        initialParams={globals}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={"#bbbbbb"} size={30} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={"#bbbbbb"} size={30} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string; size: number }) {
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={{ uri: 'https://cdn.discordapp.com/attachments/766156684648251433/776700626058608680/Logo.jpg'}}
        style={{ width: 40, height: 40 }}
      />
    );
  }
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator({ route, navigation }: any) {
  const globals = route.params;
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: props => <LogoTitle />,
          headerLeft: props => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => globals.socket.emit("add_friend", localStorage.getItem("username"))}
              style={{ marginRight: 20 }}
            >
              <TabBarIcon name="user-plus" color={"#bbbbbb"} size={23} />
            </TouchableOpacity>
          )
        }}
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


const styles = StyleSheet.create({
  container: {
    borderTopColor: "#fff",
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowRadius: 14,
    shadowOpacity: 0.2,
  }
})

// const TopicStack = createStackNavigator<TopicParamList>();

// function TopicNavigator({route, navigation} : any) {
//   const globals = route.params;
//   return (
//     <TopicStack.Navigator>
//       <TopicStack.Screen
//         name="TopicScreen"
//         component={TopicScreen}
//         options={{ headerShown: false }}
//         initialParams={globals}
//       />
//     </TopicStack.Navigator>
//   );
// }
