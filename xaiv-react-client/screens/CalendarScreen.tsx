import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

class CalendarScreen extends React.Component {
    socket: any
    constructor(props : any) {
        super(props);
        this.socket = props.route.params.socket;
        if ( typeof this.socket == "string" ) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }

    state = {
        
    };

    componentDidMount() {
        
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Hello</Text>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    }
})

export default CalendarScreen