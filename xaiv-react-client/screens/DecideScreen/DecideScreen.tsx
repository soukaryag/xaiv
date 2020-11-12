import React from 'react'
import { StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ScrollView, Pressable } from 'react-native'
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { Overlay } from 'react-native-elements';
import Modal from 'modal-react-native-web';

const { height, width } = Dimensions.get('window')

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

        this.socket.emit("get_active_groups_for_user", localStorage.getItem("username"));
        this.socket.emit("get_inactive_groups_for_user", localStorage.getItem("username"));
    };

    state = {
        active_groups : [],
        inactive_groups: [],
        overlay: false
    }

    startNewSession = () => {
        console.log("starting a new sesson");
        this.toggleOverlay();
        //pop up the overlay of non started groups

    };

    toggleOverlay = () => {
        this.setState({
            overlay: !this.state.overlay
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
