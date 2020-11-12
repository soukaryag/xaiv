import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: {
        screens: {
          LoginScreen: 'login', 
        },
      },
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Messages: {
            screens: {
              MessagesScreen: 'messages',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          Calendar: {
            screens: {
              CalendarScreen: 'calendar',
            },
          },
          Decide: {
            screens: {
              DecideScreen: 'decide',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
