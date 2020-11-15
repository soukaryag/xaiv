import React from 'react'
import { SafeAreaView, Image, Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window')

class TopicScreen extends React.Component {
    socket: any
    navigation: any
    name: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
        this.name = props.route.params.name;
        this.navigation = props.navigation;
        if (typeof this.socket == "string") {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }

        this.socket.on("create_session_complete", () => {
            this.navigation.navigate("Swipe", { socket: this.socket, name: this.name });
        });
    }

    state = {

    };

    componentDidMount() {

    }

    showAllTopics = () => {

    }

    selectTopic = (topic: String) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                AsyncStorage.getItem("username").then((value) => {
                    this.socket.emit("create_session", value, this.name, topic, position.coords.latitude, position.coords.longitude, 8);
                });
            },
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FF3D00', '#FB5A00', '#E17D20']}
                    style={styles.linearGradientContainer}>
                    <View style={styles.suggestedBox}>

                        <TouchableOpacity style={styles.suggestedTopic} onPress={() => this.selectTopic("restaurant")}>
                            <Image source={{ uri: "https://image.freepik.com/free-vector/cartoon-cook-chef-illustration-restaurant-cook-chef-hat-cook-uniform_268458-4.jpg" }} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.suggestedTopic, styles.suggestedTopicMiddle]} onPress={() => this.selectTopic("movie_theater")}>
                            <Image source={{ uri: "https://images.creativemarket.com/0.1.0/ps/8802225/600/400/m2/fpnw/wm0/movie-theatre-6-1-.jpg?1596014447&s=aa422fc225d4a9a9e330a0317c80cdba" }} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.suggestedTopic} onPress={() => this.selectTopic("gym")}>
                            <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/000/450/953/non_2x/happy-man-exercising-in-the-park-vector-illustration-in-flat-style-concept-illustration-for-healthy-lifestyle-sport-exercising.jpg" }} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.showAllTopics}>
                        <TouchableOpacity style={styles.showAllTopicsButton} onPress={() => this.showAllTopics()}>
                            <View>
                                <Text style={styles.btnText}>Show All Topics</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },
    linearGradientContainer: {
        paddingVertical: 25,
        paddingHorizontal: 3,
        alignItems: 'center',
        flex: 1,
        width: width,
        height: height,
    },
    image: {
        flex: 1,
    },
    suggestedBox: {
        flex: 1,
        width: "100%",
        height: "85%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    suggestedTopic: {
        flex: 1,
        height: "100%",
        backgroundColor: "#C68FFF",
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 4,
        marginHorizontal: 2,
    },
    suggestedTopicMiddle: {
        marginHorizontal: "1%"
    },
    showAllTopics: {
        height: "15%",
        width: "100%",
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    showAllTopicsButton: {
        textAlign: "center",
        backgroundColor: "white",
        textTransform: "uppercase",
        padding: 14,
        width: "60%",
        borderRadius: 30,
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 7,
    },
    btnText: {
        fontSize: 18,
        fontWeight: "500",
    },
})
export default TopicScreen