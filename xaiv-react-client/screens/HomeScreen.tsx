import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Card from '../components/Card'
import photoCards from '../constants/Restaurants'
import {io} from 'socket.io-client'

const { height } = Dimensions.get('window')

class HomeScreen extends React.Component {
    socket: any
    componentDidMount() {
        console.log("Mounted bitch");
        this.socket = io("http://localhost:3000", {      
            transports: ['websocket'], jsonp: false });
        this.socket.emit("connection");
        console.log("emitted connect");
        this.socket.on("test event", () => {
            console.log("client received test event");
        });
    }
    state = {
        cardData: photoCards
    };
    tmp = fetchNearestPlacesFromGoogle().then( res => this.setState({ cardData: res }) );
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

const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position.coords);
        },
    );
};

const fetchNearestPlacesFromGoogle = () => {
    const latitude: number = 38.033554;
    const longitude: number = -78.507980;
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
                var lat = googlePlace.geometry.location.lat;
                var lng = googlePlace.geometry.location.lng;
                var coordinate = {
                    latitude: lat,
                    longitude: lng,
                }

                var gallery: string = "";

                if (googlePlace.photos) {
                    for (let photo of googlePlace.photos) {
                        gallery = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAjfUxS2_xG_8I0UyUCTBI87HD1bHIgQYw`;
                        break;
                    }
                }

                place.key = googlePlace.place_id.slice(-8, -1)
                place.name = googlePlace.name
                place.photo = gallery

                places.push(place);
            }
            console.log(places)
            return places;
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