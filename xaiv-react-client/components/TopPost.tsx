import React from 'react'
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const TopPost = ({ key, postInfo }: any) => (
    <View style={styles.post}>
        <View style={styles.postSub}>
            <View style={styles.postHeader}>
                <TouchableOpacity
                    style={styles.profilePictureContainer}
                >
                    <Image source={{ uri: `https://pbs.twimg.com/profile_images/1299400345144049665/sPxnVXa7_400x400.jpg` }} style={styles.profilePicture} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.profileName}>{postInfo.activity_zero.activity_name}</Text>
                    <Text style={styles.postHeaderActivity}>Restaurant</Text>
                </View>

            </View>
            <View style={styles.postBody}>
                <View style={styles.photoCard}>
                    <Image source={{ uri: `${postInfo.activity_zero.activity_photo}` }} style={styles.postPicture} />
                </View>
            </View>
            <View style={styles.postFooter}>
                <TouchableOpacity style={styles.footerIcons}>
                    <TabBarIcon name="thumbs-up" color={"#f17650"} size={18} />
                    <Text style={styles.footerIconLabel}>{postInfo.activity_zero.right}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIcons}>
                    <TabBarIcon name="thumbs-down" color={"#f17650"} size={18} />
                    <Text style={styles.footerIconLabel}>{postInfo.activity_zero.left}</Text>
                </TouchableOpacity>

            </View>
        </View>

        <View style={styles.postSub}>
            <View style={styles.postHeader}>
                <TouchableOpacity
                    style={styles.profilePictureContainer}
                >
                    <Image source={{ uri: `https://pbs.twimg.com/profile_images/1299400345144049665/sPxnVXa7_400x400.jpg` }} style={styles.profilePicture} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.profileName}>{postInfo.activity_one.activity_name}</Text>
                    <Text style={styles.postHeaderActivity}>Restaurant</Text>
                </View>

            </View>
            <View style={styles.postBody}>
                <View style={styles.photoCard}>
                    <Image source={{ uri: `${postInfo.activity_one.activity_photo}` }} style={styles.postPicture} />
                </View>
            </View>
            <View style={styles.postFooter}>
                <TouchableOpacity style={styles.footerIcons}>
                    <TabBarIcon name="thumbs-up" color={"#f17650"} size={18} />
                    <Text style={styles.footerIconLabel}>{postInfo.activity_one.right}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIcons}>
                    <TabBarIcon name="thumbs-down" color={"#f17650"} size={18} />
                    <Text style={styles.footerIconLabel}>{postInfo.activity_one.left}</Text>
                </TouchableOpacity>

            </View>
        </View>
    </View>
)

function TabBarIcon(props: { name: string; color: string; size: number }) {
    return <Feather style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: width,
        marginBottom: 8,
        paddingVertical: 10,
        shadowOpacity: 0.15,
    },
    postSub: {
        width: "47%",
        shadowColor: '#888',
        shadowRadius: 6,
        shadowOpacity: 0.1,
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    postHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        width: "100%",
    },
    postBody: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: "100%",
    },
    postFooter: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "100%"
    },
    photoCard: {
        backgroundColor: '#eeeeee',
        borderRadius: 8,
        flex: 1,
        height: 150,
        marginRight: 10,
    },
    profilePicture: {
        width: 36, height: 36, borderRadius:50 
    },
    postPicture: {
        marginHorizontal: 3,
        flex: 1,
        borderRadius: 8,
    },
    profilePictureContainer: {
        width:38,
        height:38,
        borderRadius:50,
    },
    profileName: {
        fontSize: 12,
        fontWeight: "500",
        marginLeft: 8,
        flexWrap: "wrap",
    },
    postHeaderActivity: {
        fontSize: 12,
        fontWeight: "400",
        marginLeft: 8,
        color: "#abb6c8"
    },
    footerIcons: {
        flexDirection: 'row',
        marginRight: 25,
    },
    footerIconLabel: {
        fontSize: 10,
        fontWeight: "500",
        color: "#f17650",
        marginLeft: 4,
    },
})

export default TopPost