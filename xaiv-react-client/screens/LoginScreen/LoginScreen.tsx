import React from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native'

class LoginScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props : any) {
        super(props);
        this.socket = props.route.params.socket;
        this.navigation = props.navigation;
    }

    state = {
        username: '',
        password: ''
    }

    socketLogin = () => {
        this.socket.emit("login", this.state.username, this.state.password);
        // listen for feedback here!!!!!!

        // if logged in
        this.navigation.navigate("Root");
        // otherwise ignore
    };

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Username' onChangeText={text => this.setState({'username': text})} />
                <TextInput placeholder='Password' onChangeText={text => this.setState({'password': text})} />
                <View style={{margin:7}} />
                <Button 
                    onPress={this.socketLogin}
                    title="Submit"
                />
            </ScrollView>
        )
    }
}



export default LoginScreen