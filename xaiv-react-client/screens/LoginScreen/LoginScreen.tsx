import React from 'react'
import { StyleSheet, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View } from '../../components/Themed';

const { height, width } = Dimensions.get('window')

class LoginScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
        this.navigation = props.navigation;
    }

    state = {
        username: '',
        password: '',
    }

    componentDidMount() {
        AsyncStorage.getItem("username").then((value) => {
            if (value) {
                this.setState({username: value})
                this.navigation.navigate("Root", {socket: this.socket});
            }
        });
    }

    socketLogin = () => {
        this.socket.emit("login", this.state.username, this.state.password);

        this.socket.on("login_success", (username: string) => {
            console.log(`Logged in ${username} successfully`)
            AsyncStorage.setItem("username", this.state.username);
            this.navigation.navigate("Root", {socket: this.socket});
        })
        this.socket.on("login_failed", () => {
            console.log(`Failed to login, try again :(`)
        })
    };

    socketSignup = () => {
        this.socket.emit("signup", this.state.username, this.state.password);

        this.socket.on("signup_success", (obj: any) => {
            AsyncStorage.setItem("username", this.state.username);
            this.navigation.navigate("Root");
        })
        this.socket.on("signup_failed", (obj: any) => {
            console.log("This user already exists, please try loggin in")
        })
    };

    render() {
        return (
            <View style={styles.container} lightColor="#eee" darkColor="#003f5c">
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
            </View>
        )
    }
}

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
});

export default LoginScreen
