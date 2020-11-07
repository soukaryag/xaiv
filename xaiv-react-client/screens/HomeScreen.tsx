import React from 'react'
import { SafeAreaView, StyleSheet, Button, View, Text } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Card } from '../components/Card'

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Swiper
          cards={['SUCK', 'MY', 'GINORMOUS', 'PEEN', 'MOTHER', 'FUCKER', '!!!!!']}
          renderCard={(card: any) => {
              return (
                  <View style={styles.card}>
                      <Text style={styles.text}>{card}</Text>
                  </View>
              )
          }}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          onSwipedRight={(cardIndex) => {swipeRight(cardIndex)}}
          onSwipedLeft={(cardIndex) => {swipeLeft(cardIndex)}}
          onSwipedAll={() => {console.log('onSwipedAll')}}
          cardIndex={0}
          backgroundColor={'#ffffff'}
          stackSize= {3}
          infinite
        />
      </SafeAreaView>
    )
  }
}

const swipeRight = (idx: number) => {
    console.log(`Accepted ${idx}`);
};
const swipeLeft = (idx: number) => {
    console.log(`Rejected ${idx}`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4.84,
    elevation: 3,
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
})

export default HomeScreen