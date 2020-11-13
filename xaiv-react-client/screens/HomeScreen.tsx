import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, View, ScrollView, Dimensions, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import Modal from 'modal-react-native-web';

const { height, width } = Dimensions.get('window')

class HomeScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
    }

    state = {
        overlay: false,
        friendUsername: '',
    };

    toggleOverlay = () => {
        this.setState({overlay: !this.state.overlay});
    }

    addFriend = () => {
        this.socket.emit("add_friend", localStorage.getItem("username"), this.state.friendUsername)
            
        this.socket.on("add_friend_success", () => {
            this.setState({friendUsername: ''});
            console.log("[ADD FRIEND] Added friend to friends list!")
            this.toggleOverlay();
        }); 

        this.socket.on("add_friend_failed", () => {
            this.setState({friendUsername: ''});
            console.log("[ADD FRIEND] Could not add friend :(")
        }); 
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <Overlay ModalComponent={Modal} isVisible={this.state.overlay} onBackdropPress={this.toggleOverlay}>
                    <View style={styles.overlayContainer}>
                        
                        <View style={styles.overlayRow}>
                            <Text style={styles.overlayHeader}>
                                Add Friends
                            </Text>
                        </View>
                        <View style={styles.overlayRow}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Search"
                                placeholderTextColor="#cccccc"
                                onChangeText={text => this.setState({ friendUsername: text })}
                            />
                            <TouchableOpacity onPress={this.addFriend}>
                                <TabBarIcon name="plus" color={"#bbbbbb"} size={26} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </Overlay>
                <View style={styles.header}>
                    <Image source={{ uri:"https://cdn.discordapp.com/attachments/766156684648251433/776700626058608680/Logo.jpg" }} style={styles.logo} ></Image>
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
                <View style={styles.post}>
                    <View style={styles.topTab}>

                    </View>
                </View>
                <View style={styles.post}>
                    <View style={styles.topTab}>

                    </View>
                </View>
                <View style={styles.post}>
                    <View style={styles.topTab}>

                    </View>
                </View>
                <View style={styles.post}>
                    <View style={styles.topTab}>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

function TabBarIcon(props: { name: string; color: string; size: number }) {
    return <Feather style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
        fontWeight: 700,
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
        height: 100,
        width: width,
        borderBottomColor: '#dddddd',
        shadowColor: '#888888',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        flexWrap:"wrap"
    },
    header: {
        width: width,
        height: 60,
        flexWrap: "wrap",
        padding: 10,
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
    post: {
        backgroundColor: 'white',
        height: 200,
        width: width - 40,
        margin: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 10,
        shadowOpacity: 0.15,
    },
    topTab: {
        height: 50,
        width: width-40,
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1,
    },
    addFriend: {
        right: 15,
        position: "absolute",
        margin: 10,
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