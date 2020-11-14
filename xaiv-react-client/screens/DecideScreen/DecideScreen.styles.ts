import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../constants/Colors';

const { height, width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        fontFamily: 'montserrat'
    },
    inputText: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        borderColor: "#bbbbbb",
        borderWidth: 1,
        marginRight: 15,
    },
    friend: {
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
    selectedFriend: {
        backgroundColor: "#00FF00",
    },
    unselectedFriend: {
        backgroundColor: Colors.light.navigation,
    },


    labelRow: {
        flexDirection:'row-reverse',
        marginTop: 4,
        width: "100%",
    },
    textRow: {
        flexDirection:'row',
        marginTop: 4,
        width: "100%",
    },
    header: {
        backgroundColor: '#fff',
        width: width,
        height: 60,
        flexWrap: "wrap",
        padding: 10,
        marginBottom: 2,
        borderBottomColor: "#f0f2f5",
    },
    createGroup: {
        left: 15,
        position: "absolute",
        margin: 10,
        marginLeft: 10,
    },
    startSession: {
        right: 15,
        position: "absolute",
        margin: 10,
    },
    liveSession: {
        fontSize: 35,
        fontWeight: "500",
        marginVertical: 10,
    },
    sessionCard: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: width-20,
        marginHorizontal: 10,
        marginVertical: 5, 
        borderRadius: 8,
        shadowColor: 'black',
        shadowRadius: 15,
        shadowOpacity: 0.15,
    },
    sessionCardDate: {
        width: "20%",
        height: "100%",
        backgroundColor: "#eeeeee",
        borderRadius: 4,
        padding: 10,
    },
    sessionCardDateTop: {
        textAlign: "center",
        color: "#F2A91B",
        fontSize: 25,
        fontWeight: "500"
    },
    sessionCardDateBottom: {
        textAlign: "center",
        color: "#f17650",
        fontSize: 20,
        fontWeight: "400"
    },
    sessionCardInformationLabel: {
        width: "20%",
        paddingVertical: 10,
        paddingLeft: 15,
    },
    sessionCardInformation: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: "60%",
        height: "100%",
        borderRadius: 4,
        backgroundColor: "#fff",
    },
    sessionCardTextLabel: {
        color: "#bbbbbb",
        fontSize: 15,
        fontWeight: "400",
    },
    sessionCardText: {
        color: "#444444",
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 5,
    },
    joinSession: {
        position: "absolute",
        top: 10,
        right: 10,
    }
});