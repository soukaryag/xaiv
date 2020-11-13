import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, View, ScrollView, Dimensions, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import Modal from 'modal-react-native-web';

const { height, width } = Dimensions.get('window')

class HomeScreen extends React.Component {
    socket: any
    navigation: any
    constructor(props: any) {
        super(props);
        this.socket = props.route.params.socket;
    }

    state = {
        overlay: false,
        friendUsername: '',
    };

    toggleOverlay = () => {
        this.setState({overlay: !this.state.overlay});
    }

    addFriend = () => {
        this.socket.emit("add_friend", localStorage.getItem("username"), this.state.friendUsername)
            
        this.socket.on("add_friend_success", () => {
            this.setState({friendUsername: ''});
            console.log("[ADD FRIEND] Added friend to friends list!")
            this.toggleOverlay();
        }); 

        this.socket.on("add_friend_failed", () => {
            this.setState({friendUsername: ''});
            console.log("[ADD FRIEND] Could not add friend :(")
        }); 
    }


    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
                <Overlay ModalComponent={Modal} isVisible={this.state.overlay} onBackdropPress={this.toggleOverlay}>
                    <View style={styles.overlayContainer}>
                        
                        <View style={styles.overlayRow}>
                            <Text style={styles.overlayHeader}>
                                Add Friends
                            </Text>
                        </View>
                        <View style={styles.overlayRow}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Search"
                                placeholderTextColor="#cccccc"
                                onChangeText={text => this.setState({ friendUsername: text })}
                            />
                            <TouchableOpacity style={styles.addFriendOverlayBtn} onPress={this.addFriend}>
                                <TabBarIcon name="plus" color={"#fff"} size={20} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </Overlay>

                <View style={styles.header}>
                    <Image source={{ uri:"https://cdn.discordapp.com/attachments/766156684648251433/776927925773533204/Logo-min.png" }} style={styles.logo} ></Image>
                    <TouchableOpacity
                        onPress={() => this.toggleOverlay()}
                        style={styles.addFriend}
                        >
                        <TabBarIcon name="user-plus" color={"#bbbbbb"} size={23} />
                    </TouchableOpacity>
                </View>
                
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.groups}>
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
                </ScrollView>

                <View style={styles.post}>
                    <View style={styles.postHeader}>
                        <TouchableOpacity
                            style={styles.profilePictureContainer}
                        >
                            <Image source={{ uri: "https://website.cs.vt.edu/content/website_cs_vt_edu/en/News/department-spotlights/austin_stout_profile.transform/l-medium/image.jpg" }}  style={styles.profilePicture} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.profileName}>Austin Stout</Text>
                            <Text style={styles.postHeaderActivity}>visited a strip club with group</Text>
                        </View>
                        
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.postBody}>
                        <View style={styles.photoCard}>

                        </View>
                        <View style={styles.photoCard}>

                        </View>
                        <View style={styles.photoCard}>

                        </View>
                    </ScrollView>
                    <View style={styles.postFooter}>
                        <TouchableOpacity style={styles.footerIcons}>
                            <TabBarIcon name="thumbs-up" color={"#f17650"} size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerIcons}>
                            <TabBarIcon name="message-circle" color={"#f17650"} size={24} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style={styles.post}>
                    <View style={styles.postHeader}>
                        <TouchableOpacity
                            style={styles.profilePictureContainer}
                        >
                            <Image source={{ uri: "https://website.cs.vt.edu/content/website_cs_vt_edu/en/News/department-spotlights/austin_stout_profile.transform/l-medium/image.jpg" }}  style={styles.profilePicture} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.profileName}>Austin Stout</Text>
                            <Text style={styles.postHeaderActivity}>went to a restaurant by himself :(</Text>
                        </View>
                        
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.postBody}>
                        <View style={styles.photoCard}>

                        </View>
                    </ScrollView>
                    <View style={styles.postFooter}>
                        <TouchableOpacity style={styles.footerIcons}>
                            <TabBarIcon name="thumbs-up" color={"#f17650"} size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerIcons}>
                            <TabBarIcon name="message-circle" color={"#f17650"} size={24} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </ScrollView>
        )
    }
}

function TabBarIcon(props: { name: string; color: string; size: number }) {
    return <Feather style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f2f5',
        color: "#222a36",
        fontFamily: 'montserrat'
    },
    overlayContainer: {
        padding: 10,
    },
    overlayRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    overlayHeader: {
        width: "100%",
        fontSize: 30,
        fontWeight: 700,
        textAlign: 'center',
    },
    inputText: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        borderColor: "#bbbbbb",
        borderWidth: 1,
        marginRight: 15,
    },

    groups: {
        backgroundColor: '#fff',
        height: 100,
        width: width,
        marginBottom: 2,
        shadowOpacity: 0.2,
        flexWrap:"wrap"
    },
    header: {
        backgroundColor: '#fff',
        width: width,
        height: 60,
        flexWrap: "wrap",
        padding: 10,
        marginBottom: 2,
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
        width: width,
        marginBottom: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowOpacity: 0.15,
    },
    postHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        width: "100%",
    },
    postBody: {
        paddingVertical: 10,
        width: "100%",
    },
    postFooter: {
        flexDirection: 'row',
        paddingVertical: 5,
        width: "100%"
    },
    photoCard: {
        backgroundColor: '#eeeeee',
        borderRadius: 8,
        width: width/1.5,
        height: 150,
        marginRight: 10,
    },
    profilePicture: {
        width: 36, height: 36, borderRadius:50 
    },
    profilePictureContainer: {
        width:38,
        height:38,
        borderRadius:50,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "500",
        marginLeft: 8,
    },
    postHeaderActivity: {
        fontSize: 12,
        fontWeight: "400",
        marginLeft: 8,
        color: "#abb6c8"
    },
    footerIcons: {
        marginRight: 25,
    },


    addFriend: {
        right: 15,
        position: "absolute",
        margin: 10,
    },
    addFriendOverlayBtn: {
        borderRadius: 50,
        backgroundColor: '#1adb4b',
        padding: 3,
    },
    logo: {
        left: 15,
        position: "absolute",
        margin: 4,
        width: 40,
        height: 40,
    }
})

export default HomeScreen