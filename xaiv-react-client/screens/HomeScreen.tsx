import React from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Card from '../components/Card'
import photoCards from '../constants/Template'

const { height } = Dimensions.get('window')

class HomeScreen extends React.Component {
    socket: any
    constructor(props : any) {
        super(props);
        this.socket = props.route.params.socket;
    }

    state = {
        cardData: photoCards,
        latitude: 0,
        longitude: 0,
    };

    swipeLeft = (idx: number) => {
        this.socket.emit('swipe-left', this.state.cardData[idx]);
        console.log(`Rejected ${idx}`);
    };
    swipeRight = (idx: number) => {
        this.socket.emit('swipe-right', this.state.cardData[idx]);
        console.log(`Accepted ${idx}`);
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                fetchNearestPlacesFromGoogle(this.state.latitude, this.state.longitude).then( res => this.setState({ cardData: res }) );
            },
        );
    }

    render() {
        //console.log(photoCards);
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.swiperContainer}>
                    <Swiper
                        animateCardOpacity
                        cards={this.state.cardData}
                        renderCard={(card: any) => <Card card={card} />}
                        disableBottomSwipe={true}
                        disableTopSwipe={true}
                        onSwipedLeft={(cardIndex: number) => { this.swipeLeft(cardIndex) }}
                        onSwipedRight={(cardIndex: number) => { this.swipeRight(cardIndex) }}
                        cardIndex={0}
                        backgroundColor="white"
                        stackSize={3}
                        infinite
                        showSecondCard
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const fetchNearestPlacesFromGoogle = (latitude: number, longitude: number) => {
    const radMetter: number = 1 * 1000;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radMetter}&type=restaurant&key=AIzaSyAjfUxS2_xG_8I0UyUCTBI87HD1bHIgQYw`

    return fetch(proxyurl + url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            var places = []
            for (let googlePlace of res.results) {
                var place: any = {}
                var gallery: string = "";

                if (googlePlace.photos) {
                    for (let photo of googlePlace.photos) {
                        gallery = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAjfUxS2_xG_8I0UyUCTBI87HD1bHIgQYw`;
                        break;
                    }
                }

                place.activity_id = googlePlace.place_id
                place.activity_name = googlePlace.name
                place.activity_photo = gallery

                places.push(place);
            }
            console.log(places)
            return places.slice(0, 3);
        })
        .catch(error => {
            console.log(error);
        });
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
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
})

export default HomeScreen