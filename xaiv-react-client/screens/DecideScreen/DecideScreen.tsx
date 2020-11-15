import React from 'react'
import {Text, View, TextInput, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './DecideScreen.styles';
import Modal from 'modal-react-native-web';

class DecideScreen extends React.Component {
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
            return;
        }
        
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

        this.socket.on("receive_friends", (friends: any) => {
            var temp = friends.map((friend : String) => {
                return {
                    "friend": {
                        "name": friend,
                        "selected": false,
                        }
                    }
            });
            this.setState({
                friends: temp,
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
        newGroupName: "Unnamed group",
    }

    createGroup = () => {
        // console.log("create group client")
        
        var tmp : any = [];
        for (var i = 0; i < this.state.friends.length; i++) {
            if (this.state.friends[i]["friend"]["selected"]) {
                tmp.push(this.state.friends[i]["friend"]["name"]);
            }
        }
        AsyncStorage.getItem("username").then((value: any) => {
            // console.log("got the vALUE BITCH", value);
            this.socket.emit("create_group", [value].concat(tmp), this.state.newGroupName);
        });
        
    }

    startNewSession = () => {
        // console.log("starting a new session");
        this.toggleOverlay();
        //pop up the overlay of non started groups
    };

    displayFriends = () => {
        // console.log("DISPLAY FRIENDS FUNCTION CALLED")
        AsyncStorage.getItem("username").then((value: any) => {
            this.socket.emit("get_friends", value);
        });
        this.toggleCreateGroupOverlay();
    }

    selectFriend = (friendIndex: number) => {
        var temp : any = [];
        for (var i = 0; i < this.state.friends.length; i++) {
            temp.push(this.state.friends[i]);
        }
        temp[friendIndex]["friend"]["selected"] = ! temp[friendIndex]["friend"]["selected"];
        // console.log("???", temp);
        this.setState({
            friends: temp,
        })
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
            <View style={styles.container}>
                <Overlay ModalComponent={Modal} isVisible={this.state.overlay} onBackdropPress={this.toggleOverlay}>
                    <ScrollView style={styles.overlayContainer}>
                        <Text style={styles.headingText}>Create Session</Text>
                        {this.state.inactive_groups.map((prop, key) => {
                            return (
                                <TouchableOpacity onPress={() => {this.decideTopic(prop)}} key={key}>
                                    <View style={styles.pickGroupCard}>                                        
                                        <Image source={{ uri: "https://img.freepik.com/free-vector/group-young-people-posing-photo_52683-18824.jpg?size=338&ext=jpg" }} style={styles.groupPicture} />                                    
                                        <View style={styles.pickGroupCardTextContainer}>
                                            <Text style={styles.pickGroupCardTextMain}>{prop}</Text>
                                            <Text style={styles.pickGroupCardTextSub}>Group description</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </Overlay>

                <Overlay ModalComponent={Modal} isVisible={this.state.createGroupOverlay} onBackdropPress={this.toggleCreateGroupOverlay}>
                    <View style={styles.overlayContainer}>
                        <Text style={styles.headingText}>Create Group</Text>
                        
                        <ScrollView>
                            {this.state.friends.map((prop, key) => {
                                return (
                                    <TouchableOpacity style={[styles.highlightContainer ,prop["friend"]["selected"] ? styles.selectedFriend : styles.unselectedFriend]} onPress={() => {this.selectFriend(key)}} key={key}>
                                        <View style={styles.pickGroupCard}>                                        
                                            <Image source={{ uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" }} style={styles.groupPicture} />                                    
                                            <View style={styles.pickGroupCardTextContainer}>
                                                <Text style={styles.pickGroupCardTextMain}>{prop["friend"]["name"]}</Text>
                                                <Text style={styles.pickGroupCardTextSub}>User description</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <View style={styles.formRow}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Group name..."
                                placeholderTextColor="#cccccc"
                                onChangeText={text => this.setState({ newGroupName: text })}
                            />
                            <TouchableOpacity style={styles.createGroupBtn} onPress={() => {this.createGroup()}}>
                                <Text style={styles.createGroupBtnText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>                    
                </Overlay>

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.displayFriends()}
                        style={styles.createGroup}
                        >
                        <TabBarIcon name="users" color={"#bbbbbb"} size={23} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.startNewSession()}
                        style={styles.startSession}
                        >
                        <TabBarIcon name="plus" color={"#bbbbbb"} size={23} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headingText}>Live Sessions</Text>
                
                <ScrollView>
                    {this.state.active_groups.map((prop, key) => {
                        return (
                            <View style={styles.sessionCard}>
                                <View style={styles.sessionCardDate}>
                                    <Text style={styles.sessionCardDateTop}>12</Text>
                                    <Text style={styles.sessionCardDateBottom}>Jun</Text>
                                </View>
                                <View style={styles.sessionCardInformationLabel}>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.sessionCardTextLabel}>Group</Text>
                                    </View>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.sessionCardTextLabel}>Activity</Text>
                                    </View>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.sessionCardTextLabel}>Location</Text>
                                    </View>
                                </View>
                                <View style={styles.sessionCardInformation}>
                                    <View style={styles.textRow}>
                                        <Text style={styles.sessionCardText} numberOfLines={1}>{prop}</Text>
                                    </View>
                                    <View style={styles.textRow}>
                                        <Text style={styles.sessionCardText} numberOfLines={1}>Restaurant</Text>
                                    </View>
                                    <View style={styles.textRow}>
                                        <Text style={styles.sessionCardText} numberOfLines={1}>Arlington, VA</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.joinSession} onPress={() => {this.joinGroupSwiping(prop)}} key={key}>
                                    <TabBarIcon name="play-circle" color={"#44ee44"} size={20} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        )
    }
}

function TabBarIcon(props: { name: string; color: string; size: number }) {
    return <Feather style={{ marginBottom: -3 }} {...props} />;
}



export default DecideScreen
