const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

/*
Background: EFEFEF
Pop-up: FFFFFF
Text: 000000
Dashboard color: FFC700
*/
const backgroundLight = '#efefef';
const popUpLight = '#ffffff';
const headerLight = '#ffffff';
const textLight = '#000000';
const navigationLight = '#ffc700';

export default {
  light: {
    text: textLight,
    background: backgroundLight,
    tint: tintColorLight,
    popUp: popUpLight,
    header: headerLight,
    navigation: navigationLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    navigation: navigationLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
