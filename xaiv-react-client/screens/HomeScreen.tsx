import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Card from '../components/Card'
import IconButton from '../components/IconButton'
import photoCards from '../constants/Restaurants'

const { height } = Dimensions.get('window')

class HomeScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.swiperContainer}>
                    <Swiper
                        animateCardOpacity
                        cards={photoCards}
                        renderCard={(card: any) => <Card card={card} />}
                        disableBottomSwipe={true}
                        disableTopSwipe={true}
                        onSwipedLeft={(cardIndex: number) => { swipeLeft(cardIndex) }}
                        onSwipedRight={(cardIndex: number) => { swipeRight(cardIndex) }}
                        cardIndex={0}
                        backgroundColor="white"
                        stackSize={2}
                        infinite
                        showSecondCard
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const swipeLeft = (idx: number) => {
    console.log(`Rejected ${idx}`);
};
const swipeRight = (idx: number) => {
    console.log(`Accepted ${idx}`);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    swiperContainer: {
        height: height - 250,
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '15%',
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
})

export default HomeScreen