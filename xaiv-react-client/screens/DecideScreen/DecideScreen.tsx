import React from 'react'
import { StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ScrollView, Pressable } from 'react-native'
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'modal-react-native-web';

class DecideScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
        this.navigation = props.navigation;
        
        this.socket.on("return_active_groups_for_user", (active_groups: any) => { 
            this.setState({
                active_groups: active_groups,
            });
        });

        this.socket.on("return_inactive_groups_for_user", (inactive_groups: any) => {
            this.setState({
                inactive_groups: inactive_groups,
            });
        });

        this.socket.on("get_friends_for_user", (friends: any) => {
            this.setState({
                friends: friends,
            })
        });

        AsyncStorage.getItem("username").then((value: any) => {
            this.socket.emit("get_active_groups_for_user", value);
            this.socket.emit("get_inactive_groups_for_user", value);
        });
        
        
    };

    state = {
        active_groups : [],
        inactive_groups: [],
        friends: [],
        overlay: false,
        createGroupOverlay: false,
    }

    startNewSession = () => {
        console.log("starting a new sesson");
        this.toggleCreateGroupOverlay();
        //pop up the overlay of non started groups
    };

    displayFriends = () => {
        this.socket.emit("get_friends_for_user");
        this.toggleOverlay();
    }

    selectFriend = (friendIndex: number) => {
        var temp = [...this.state.friends];
        //temp[friendIndex]["selected"] = !temp[friendIndex]["selected"];
        //this.setState({
        //    friends: 
        //})
    }

    toggleOverlay = () => {
        this.setState({
            overlay: !this.state.overlay
        });
    };

    toggleCreateGroupOverlay = () => {
        this.setState({
            createGroupOverlay: !this.state.createGroupOverlay
        });
    };

    joinGroupSwiping = (name: String) => {
        //display a swipe screen, and give it the required params:
        //socket
        //group
        this.navigation.navigate("Swipe", {socket: this.socket, name: name});
    };

    /* Navigate to the pick topic screen */

    decideTopic = (name: String) => {
        this.toggleOverlay();
        this.navigation.navigate("Topic", {socket: this.socket, name: name});
    };

    render() {
        return (
            <View style={styles.container} lightColor="#eee" darkColor="#003f5c">
                <View style={styles.topBar} lightColor={Colors.light.header}><Text>Choose a Group</Text></View>
                <Overlay ModalComponent={Modal} isVisible={this.state.overlay} onBackdropPress={this.toggleOverlay}>
                    <ScrollView style={styles.scrollContainer}>
                        {this.state.inactive_groups.map((prop, key) => {
                            return (
                                <Pressable onPress={() => {this.decideTopic(prop)}} key={key}>
                                    <View style={[styles.group, styles.activeGroup]} lightColor={Colors.light.navigation} >
                                        <Text style={styles.groupText} lightColor={Colors.light.text}>{prop}</Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </Overlay>
                <Overlay ModalComponent={Modal} isVisible={this.state.createGroupOverlay} onBackdropPress={this.toggleCreateGroupOverlay}>
                    <ScrollView style={styles.scrollContainer}>
                        {this.state.friends.map((prop, key) => {
                            return (
                                <Pressable onPress={() => {this.selectFriend(key)}} key={key}>
                                    <View style={[styles.group, styles.activeGroup]} lightColor={Colors.light.navigation} >
                                        <Text style={styles.groupText} lightColor={Colors.light.text}>{prop}</Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </Overlay>
                <ScrollView style={styles.scrollContainer}>
                    {this.state.active_groups.map((prop, key) => {
                        return (
                            <Pressable onPress={() => {this.joinGroupSwiping(prop)}} key={key}>
                                <View style={[styles.group, styles.activeGroup]} lightColor={Colors.light.navigation} >
                                    <Text style={styles.groupText} lightColor={Colors.light.text}>{prop}</Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </ScrollView>
                <TouchableOpacity onPress={() => this.displayFriends()}>Create a group biatch</TouchableOpacity>
                <Pressable style={styles.startButton} onPress={this.startNewSession}><Text style={{fontSize: 24}}>Start New Session</Text></Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        width: '100%',
    },
    topBar: {
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center',
        height: 40,
        fontSize: 16,
        marginBottom: 10,
    },
    group: {
        width: '90%',
        textAlign: 'center',
        marginTop: 3,
        marginBottom: 3,
        marginHorizontal: 'auto',
        padding: 8,
        borderBottomRightRadius: 12,
        shadowColor: "darkgray",
        shadowOpacity: 0.5,
        shadowOffset: { width: 3, height: 3},
    },
    groupText: {
        fontSize: 18,
    },
    activeGroup: {
        
    },
    startButton: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '70%',
        position: 'absolute',
        zIndex: 1,
        bottom: 25,
        left: '15%',
        height: 70,
        fontSize: 24,
        backgroundColor: Colors.light.popUp,
        shadowColor: "darkgray",
        shadowOpacity: 0.5,
        shadowOffset: { width: 3, height: 3 },
        borderRadius: 5,
    }
});

export default DecideScreen
