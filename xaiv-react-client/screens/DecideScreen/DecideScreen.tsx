import React from 'react'
import { StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ScrollView, Pressable } from 'react-native'
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';

const { height, width } = Dimensions.get('window')

class DecideScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
        this.navigation = props.navigation;
        this.socket.emit("get_groups_for_user", localStorage.getItem("username"));
        
        this.socket.on("return_groups_for_user", (group_names: any) => { 
            console.log("names is ", group_names);
            this.setState({
                groups: group_names
            });
            
        });
    };

    state = {
        groups : [],
    }

    

    startNewSession = () => {
        console.log("starting a new sesson");
        //pop up the overlay of non started groups
    };

    joinGroupSwiping = (name: String) => {
        console.log("joining group", name);
        //display a swipe screen, and give it the required params:
        //socket
        //group
        this.navigation.navigate("Swipe", {socket: this.socket, name: name});
    };

    render() {
        return (
            <View style={styles.container} lightColor="#eee" darkColor="#003f5c">
                <View style={styles.topBar} lightColor={Colors.light.header}><Text>Choose a Group</Text></View>
                <ScrollView style={styles.scrollContainer}>
                    {this.state.groups.map((prop, key) => {
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

/*
    <Text style={styles.logo}>XAIV</Text>
    <View style={styles.inputView} >
        <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ username: text })} />
    </View>
    <View style={styles.inputView} >
        <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })} />
    </View>
    <TouchableOpacity>
        <Text lightColor="#000" darkColor="#fff">Forgot Password?</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.loginBtn} onPress={this.socketLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={this.socketSignup}>
        <Text lightColor="#000" darkColor="#fff">Signup</Text>
    </TouchableOpacity>



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#ffffff",
        opacity: 0.7,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
}); */

export default DecideScreen
