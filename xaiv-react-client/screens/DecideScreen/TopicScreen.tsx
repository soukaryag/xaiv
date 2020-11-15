import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, Dimensions, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { height } = Dimensions.get('window')

class TopicScreen extends React.Component {
    socket: any
    navigation: any
    name: any
    constructor(props : any) {
        super(props);
        this.socket = props.route.params.socket;
        this.name = props.route.params.name;
        this.navigation = props.navigation;
        if ( typeof this.socket == "string" ) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }

        this.socket.on("create_session_complete", () => {
            this.navigation.navigate("Swipe", {socket: this.socket, name: this.name});
        });
    }

    state = {

    };

    componentDidMount() {
        
    }

    showAllTopics = () => {
        console.log("Show all the topics biatch");
    }

    selectTopic = (topic: String) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                AsyncStorage.getItem("username").then((value) => {
                    topic = "doctor";
                    this.socket.emit("create_session", value, this.name, topic, position.coords.latitude, position.coords.longitude, 8);
                });
            },
        );
        console.log(name, topic);
        //Update the group to have an active session
        //Populate the group pool with google api cards
        
    }


    render() {
        /*if (!this.state.ready) {
            return (
                <View>Loading...</View>
            );
        } */
        return (
            <View style={styles.container} lightColor="#eee" darkColor="#003f5c">
                <View style={styles.suggestedBox}>
                    <Pressable style={styles.suggestedTopic} onPress={() => this.selectTopic("restaurant")}>
                        <View>
                            <Text>Sit-in food</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles.suggestedTopic, styles.suggestedTopicMiddle]} onPress={() => this.selectTopic("movie_theater")}>
                        <View>
                            <Text>Movie theaters biatch</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.suggestedTopic} onPress={() => this.selectTopic("gym")}>
                        <View>
                        <Text>Gym</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.showAllTopics}>
                    <Pressable style={styles.showAllTopicsButton} onPress={() => this.showAllTopics()}>
                        <View>
                        <Text>Show All Topics</Text>
                        </View>
                    </Pressable>
                </View>
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
    suggestedBox: {
        flex: 1,
        width: "100%",
        height: "70%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    suggestedTopic: {
        flex: 1,
        height: "100%",
        backgroundColor: "#C68FFF",
        shadowColor: "darkgray",
        shadowOpacity: 0.2,
        shadowOffset: { width: -3, height: 7},
    },
    suggestedTopicMiddle: {
        marginHorizontal: "1%"
    },
    showAllTopics: {
        height: "30%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    showAllTopicsButton: {
        textAlign: "center",
        fontSize: 18,
        backgroundColor: "white",
        textTransform: "uppercase",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
        padding: "10%",
        width: "80%",
        borderRadius: 30,
        shadowColor: "darkgray",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 7},
    }
})

export default TopicScreen