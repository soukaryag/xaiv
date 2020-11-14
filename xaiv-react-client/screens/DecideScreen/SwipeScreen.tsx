import React from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Card from '../../components/Card'
import photoCards from '../../constants/Template'
import IconButton from '../../components/IconButton';

const { height } = Dimensions.get('window')

class SwipeScreen extends React.Component {
    socket: any
    name: any
    swiper: any
    navigation: any
    constructor(props : any) {
        super(props);
        this.socket = props.route.params.socket;
        this.navigation = props.navigation;
        this.name = props.route.params.name;
        if ( typeof this.socket == "string" ) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            return;
        }

        this.socket.on("return_feed_for_user", (feed: any) => { 
            console.log("pool is ", feed);
            this.setState({
                ready: true,
                cardData: feed
            });
        });

        this.socket.on("consensus_achieved", (cardData: any) => {
            console.log("CONSENUS ACHIEVED ON", cardData);
        });
    }

    state = {
        ready: false,
        cardData: photoCards,
        latitude: 0,
        longitude: 0,
        currIdx: 0
    };

    async componentDidMount() {
        if ( typeof this.socket == "string" ) {
            await this.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            return;
        }
        console.log("mounted - emitting");
        AsyncStorage.getItem("username").then((value) => {
            this.socket.emit("get_feed_for_user", value, this.name);
        });

    }
    swipeLeft = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeLeft();
        AsyncStorage.getItem("username").then((value) => {
            this.socket.emit('swipe-left', value, this.name, this.state.cardData[idx]);
        });
        
        console.log(`Rejected ${idx}`);
    };
    swipeRight = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeRight();
        AsyncStorage.getItem("username").then((value) => {
            this.socket.emit('swipe-right', value, this.name, this.state.cardData[idx]);
        });
        console.log(`Accepted ${idx}`);
    };
    swipeTop = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeTop();
        AsyncStorage.getItem("username").then((value) => {
            this.socket.emit('swipe-right', value, this.state.cardData[idx]);
        });
        console.log(`SUPER Accepted ${idx}`);
    };

    render() {
        if (!this.state.ready) {
            return (
                <View>Loading...</View>
            );
        }
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

export default SwipeScreen