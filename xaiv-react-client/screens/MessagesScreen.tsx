import { Feather } from '@expo/vector-icons';
import React from 'react'
import { Text, SafeAreaView, View, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './DecideScreen/DecideScreen.styles';
import { Overlay } from 'react-native-elements';
import Modal from 'modal-react-native-web';
import ConsensusCard from '../components/ConsensusCard';

const { height, width } = Dimensions.get('window')

class MessagesScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
        this.navigation = props.navigation;
        if (typeof this.socket == "string") {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            return;
        }

        this.socket.on("return_active_groups_and_consensus_for_user", (active_groups: any) => {
            console.log(active_groups);
            this.setState({
                active_groups: active_groups,
            });
        });

        this.socket.on("receive_friends", (friends: any) => {
            var temp = friends.map((friend: String) => {
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
            this.socket.emit("get_active_groups_and_consensus_for_user", value);
        });

    };

    state = {
        active_groups: [],
        friends: [],
        createGroupOverlay: false,
        newGroupName: "Unnamed group",
    }

    createGroup = () => {
        // console.log("create group client")

        var tmp: any = [];
        for (var i = 0; i < this.state.friends.length; i++) {
            if (this.state.friends[i]["friend"]["selected"]) {
                tmp.push(this.state.friends[i]["friend"]["name"]);
            }
        }
        AsyncStorage.getItem("username").then((value: any) => {
            this.socket.emit("create_group", [value].concat(tmp), this.state.newGroupName);
        });

    }

    displayFriends = () => {
        AsyncStorage.getItem("username").then((value: any) => {
            this.socket.emit("get_friends", value);
        });
        this.toggleCreateGroupOverlay();
    }

    selectFriend = (friendIndex: number) => {
        var temp: any = [];
        for (var i = 0; i < this.state.friends.length; i++) {
            temp.push(this.state.friends[i]);
        }
        temp[friendIndex]["friend"]["selected"] = !temp[friendIndex]["friend"]["selected"];
        this.setState({
            friends: temp,
        })
    }

    toggleCreateGroupOverlay = () => {
        this.setState({
            createGroupOverlay: !this.state.createGroupOverlay
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Overlay ModalComponent={Modal} isVisible={this.state.createGroupOverlay} onBackdropPress={this.toggleCreateGroupOverlay}>
                    <View style={styles.overlayContainer}>
                        <Text style={styles.headingText}>Create Group</Text>

                        <ScrollView>
                            {this.state.friends.map((prop, key) => {
                                return (
                                    <TouchableOpacity style={[styles.highlightContainer, prop["friend"]["selected"] ? styles.selectedFriend : styles.unselectedFriend]} onPress={() => { this.selectFriend(key) }} key={key}>
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
                            <TouchableOpacity style={styles.createGroupBtn} onPress={() => { this.createGroup() }}>
                                <Text style={styles.createGroupBtnText}>Create</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Overlay>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.displayFriends() }}
                        style={styles.createGroup}
                    >
                        <TabBarIcon name="users" color={"#bbbbbb"} size={23} />
                    </TouchableOpacity>

                </View>

                <Text style={styles.headingText}>Decided Events</Text>

                <ScrollView>
                    {this.state.active_groups.map((prop, key) => {
                        var copy = { "consensus": [] };
                        Object.assign(copy, prop);
                        return (
                            <View>
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
                                            <Text style={styles.sessionCardText} numberOfLines={1}>{prop["name"]}</Text>
                                        </View>
                                        <View style={styles.textRow}>
                                            <Text style={styles.sessionCardText} numberOfLines={1}>Restaurant</Text>
                                        </View>
                                        <View style={styles.textRow}>
                                            <Text style={styles.sessionCardText} numberOfLines={1}>Arlington, VA</Text>
                                        </View>
                                    </View>

                                </View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={messagesStyles.post}>
                                    {copy.consensus.map((group: any, key: number) => {
                                        return (
                                            <ConsensusCard key={key} cardInfo={group} />
                                        );
                                    })}
                                </ScrollView>


                            </View>

                        );
                    })}
                </ScrollView>
            </View>
        )
    }
}

const messagesStyles = StyleSheet.create({
    groups: {
        backgroundColor: '#fff',
        height: 100,
        width: width,
        marginBottom: 2,
        shadowOpacity: 0.2,
        flexWrap: "wrap"
    },
    post: {
        marginHorizontal: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        width: width - 10,
        marginBottom: 8,
        paddingVertical: 10,
        shadowOpacity: 0.15,
    },
})

function TabBarIcon(props: { name: string; color: string; size: number }) {
    return <Feather style={{ marginBottom: -3 }} {...props} />;
}

export default MessagesScreen