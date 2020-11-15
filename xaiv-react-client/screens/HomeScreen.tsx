import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, View, ScrollView, Dimensions, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import HomePost from '../components/HomePost';
import TopPost from '../components/TopPost';
import postCards from '../constants/PostTemplate';

const { height, width } = Dimensions.get('window')

class HomeScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
        this.navigation = props.navigation;
        if ( typeof this.socket == "string" ) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }

    state = {
        overlay: false,
        friendUsername: '',
        postCards: postCards,
        topPost: {},
    };

    componentDidMount() {
        if ( typeof this.socket == "string" ) {
            this.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                this.socket.emit("get_top_activities_solana", position.coords.latitude, position.coords.longitude);
            },
        );

        this.socket.on("receive_top_activities_solana", (res: any) => {
            this.setState({ topPost: res })
        });
    }

    toggleOverlay = () => {
        this.setState({overlay: !this.state.overlay});
    }

    addFriend = () => {
        AsyncStorage.getItem("username").then((value) => {
            this.socket.emit("add_friend", value, this.state.friendUsername);
        });
        
        this.socket.on("add_friend_success", () => {
            this.setState({friendUsername: ''});
            this.toggleOverlay();
        }); 

        this.socket.on("add_friend_failed", () => {
            this.setState({friendUsername: ''});
        }); 
    }


    render() {
        const posts = []

        if ('activity_zero' in this.state.topPost) {
            posts.push(<TopPost key={0} postInfo={this.state.topPost}/>)
        }

        for (let i = 0; i < this.state.postCards.length; i++) {
            posts.push(<HomePost key={i+1} postInfo={this.state.postCards[i]} />)
        }

        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
                <Overlay isVisible={this.state.overlay} onBackdropPress={this.toggleOverlay}>
                    <View style={styles.overlayContainer}>
                        
                        <View style={styles.overlayRow}>
                            <Text style={styles.overlayHeader}>Add Friends</Text>
                        </View>
                        <View style={styles.overlayRow}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Search"
                                placeholderTextColor="#cccccc"
                                onChangeText={text => this.setState({ friendUsername: text })}
                            />
                            <TouchableOpacity style={styles.addFriendOverlayBtn} onPress={this.addFriend}>
                                <TabBarIcon name="plus" color={"#fff"} size={20} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </Overlay>

                <View style={styles.header}>
                    <Image source={{ uri:"https://cdn.discordapp.com/attachments/766156684648251433/776927925773533204/Logo-min.png" }} style={styles.logo} ></Image>
                    <TouchableOpacity
                        onPress={() => this.toggleOverlay()}
                        style={styles.addFriend}
                        >
                        <TabBarIcon name="user-plus" color={"#bbbbbb"} size={23} />
                    </TouchableOpacity>
                </View>
                
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.groups}>
                    <TouchableOpacity
                        style={styles.groupContainer}
                    >
                        <Image source={{ uri: "https://img.freepik.com/free-vector/group-young-people-posing-photo_52683-18824.jpg?size=338&ext=jpg" }}  style={styles.groupImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.groupContainer}
                    >
                        <Image source={{ uri: "https://previews.123rf.com/images/jemastock/jemastock1903/jemastock190315348/124169755-happy-people-dancing-and-having-fun-vector-illustration-graphic-design.jpg" }}  style={styles.groupImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.groupContainer}
                    >
                        <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYntHBHrOU32bP3xo1IY508n5j62kyQZrUpQ&usqp=CAU" }}  style={styles.groupImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.groupContainer}
                    >
                        <Image source={{ uri: "https://image.freepik.com/free-vector/young-people-illustration-concept_23-2148457572.jpg" }}  style={styles.groupImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.groupContainer}
                    >
                        <Image source={{ uri: "https://image.freepik.com/free-vector/young-people-illustration-design_23-2148473079.jpg" }}  style={styles.groupImage} />
                    </TouchableOpacity>
                </ScrollView>

                {posts}

            </ScrollView>
        )
    }
}

function TabBarIcon(props: { name: string; color: string; size: number }) {
    return <Feather style={{ marginBottom: -3 }} {...props} />
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f2f5',
        color: "#222a36",
    },
    overlayContainer: {
        padding: 10,
    },
    overlayRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    overlayHeader: {
        width: "100%",
        fontSize: 30,
        fontWeight: "700",
        textAlign: 'center',
    },
    inputText: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        borderColor: "#bbbbbb",
        borderWidth: 1,
        marginRight: 15,
    },

    groups: {
        backgroundColor: '#fff',
        height: 100,
        width: width,
        marginBottom: 2,
        shadowOpacity: 0.2,
        flexWrap:"wrap"
    },
    header: {
        backgroundColor: '#fff',
        width: width,
        height: 60,
        flexWrap: "wrap",
        padding: 10,
        marginBottom: 2,
    },
    groupContainer: {
        borderWidth:4,
        borderColor:'rgba(154, 18, 179, 0.6)',
        alignItems:'center',
        justifyContent:'center',
        width:64,
        height:64,
        backgroundColor:'#fff',
        borderRadius:50,
        margin: 15,
    },
    groupImage: { 
        width: 60, height: 60, borderRadius:50 
    },

    addFriend: {
        right: 15,
        position: "absolute",
        margin: 10,
    },
    addFriendOverlayBtn: {
        borderRadius: 50,
        backgroundColor: '#1adb4b',
        padding: 3,
    },
    logo: {
        left: 15,
        position: "absolute",
        margin: 4,
        width: 40,
        height: 40,
    }
})

export default HomeScreen