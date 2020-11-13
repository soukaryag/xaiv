import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, ScrollView, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

class HomeScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
    }

    state = {
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.groups}>
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
                <View style={styles.post}>
                    <View style={styles.topTab}>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
    }
})

export default HomeScreen