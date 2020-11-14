import React from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Card from '../components/Card'
import IconButton from '../components/IconButton';
import photoCards from '../constants/Template'

const { height } = Dimensions.get('window')

class HomeScreen extends React.Component {
    socket: any
    navigation: any
    swiper: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
    }

    state = {
        cardData: photoCards,
        latitude: 0,
        longitude: 0,
        currIdx: 0,
    };

    

    swipeLeft = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeLeft();
        this.socket.emit('swipe-left', this.state.cardData[idx]);
        console.log(`Rejected ${idx}`);
    };
    swipeRight = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeRight();
        this.socket.emit('swipe-right', this.state.cardData[idx]);
        console.log(`Accepted ${idx}`);
    };
    swipeTop = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeTop();
        this.socket.emit('swipe-right', this.state.cardData[idx]);
        console.log(`SUPER Accepted ${idx}`);
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                this.socket.emit('get_activities', position.coords.latitude, position.coords.longitude, 1);
                this.socket.on('send_activities', (res: any) => {
                    this.setState({ cardData: res });
                    console.log(this.state);
                })

            },
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                
                <View style={styles.swiperContainer}>
                    <Swiper
                        ref={swiper => {
                            this.swiper = swiper
                        }}
                        animateCardOpacity
                        cards={this.state.cardData}
                        renderCard={(card: any) => <Card card={card} />}
                        disableBottomSwipe={true}
                        onSwipedLeft={(cardIndex: number) => { this.swipeLeft(cardIndex) }}
                        onSwipedRight={(cardIndex: number) => { this.swipeRight(cardIndex) }}
                        onSwipedTop={(cardIndex: number) => { this.swipeTop(cardIndex) }}
                        cardIndex={0}
                        backgroundColor="white"
                        stackSize={3}
                        infinite
                        showSecondCard
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <IconButton
                        name="close"
                        onPress={() => { this.swipeLeft(this.state.currIdx, true) }}
                        color="white"
                        backgroundColor="#E5566D"
                        size={20}
                    />
                    <IconButton
                        name="star"
                        onPress={() => {  this.swipeTop(this.state.currIdx, true) }}
                        color="white"
                        backgroundColor="#3CA3FF"
                        size={30}
                    />
                    <IconButton
                        name="heart"
                        onPress={() => { this.swipeRight(this.state.currIdx, true) }}
                        color="white"
                        backgroundColor="#4CCC93"
                        size={20}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

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
        height: 250,
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
})

export default HomeScreen