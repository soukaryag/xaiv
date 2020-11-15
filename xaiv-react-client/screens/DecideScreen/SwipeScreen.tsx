import React from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Card from '../../components/Card'
import photoCards from '../../constants/Template'
import IconButton from '../../components/IconButton';

const { height, width } = Dimensions.get('window')

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
            // console.log("pool is ", feed);
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
    leaveSession = () => {
        this.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }
    swipeLeft = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeLeft();
        AsyncStorage.getItem("username").then((value) => {
            this.socket.emit('swipe-left', value, this.name, this.state.cardData[idx]);
        });
        
        // console.log(`Rejected ${idx}`);
    };
    swipeRight = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeRight();
        AsyncStorage.getItem("username").then((value) => {
            this.socket.emit('swipe-right', value, this.name, this.state.cardData[idx]);
        });
        // console.log(`Accepted ${idx}`);
    };
    swipeTop = (idx: number, button=false) => {
        this.setState({ currIdx: idx });
        if (button) this.swiper.swipeTop();
        AsyncStorage.getItem("username").then((value) => {
            this.socket.emit('swipe-right', value, this.state.cardData[idx]);
        });
        // console.log(`SUPER Accepted ${idx}`);
    };

    render() {
        if (!this.state.ready) {
            return (
                <View style={[{flex: 1,justifyContent: "center"}, { flexDirection: "row", justifyContent: "space-around", padding: 10 }]}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            );
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.leaveSession()}
                        style={styles.leaveSession}
                        >
                        <TabBarIcon name="arrow-left" color={"#bbbbbb"} size={23} />
                    </TouchableOpacity>
                </View>
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

function TabBarIcon(props: { name: string; color: string; size: number }) {
    return <Feather style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#fff',
        width: width,
        height: 40,
        flexWrap: "wrap",
        paddingTop: 10,
        paddingRight: 10,
    },
    leaveSession: {
        left: 15,
        position: "absolute",
        marginTop: 10,
        marginLeft: 10,
    },
    swiperContainer: {
        height: height - 260,
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: '15%',
        height: 230,
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
})

export default SwipeScreen