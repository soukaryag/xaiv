import React from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Card from '../../components/Card'
import photoCards from '../../constants/Template'

const { height } = Dimensions.get('window')

class TopicScreen extends React.Component {
    socket: any
    name: any
    constructor(props : any) {
        super(props);
        this.socket = props.route.params.socket;
        this.name = props.route.params.name;

    }

    state = {
        
    };

    componentDidMount() {
        
    }


    render() {
        /*if (!this.state.ready) {
            return (
                <View>Loading...</View>
            );
        } */
        return (
            <SafeAreaView style={styles.container}>
                
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    swiperContainer: {
        height: height - 250,
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '15%',
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
})

export default TopicScreen