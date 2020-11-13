import React from 'react'
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const HomePost = ({ postInfo }: any) => (
    <View style={styles.post} key={postInfo.key}>
        <View style={styles.postHeader}>
            <TouchableOpacity
                style={styles.profilePictureContainer}
            >
                <Image source={{ uri: `${postInfo.profile_picture}` }} style={styles.profilePicture} />
            </TouchableOpacity>
            <View>
                <Text style={styles.profileName}>{postInfo.username}</Text>
                <Text style={styles.postHeaderActivity}>{postInfo.activity_description}</Text>
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
)

function TabBarIcon(props: { name: string; color: string; size: number }) {
    return <Feather style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
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

})

export default HomePost