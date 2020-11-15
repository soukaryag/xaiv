import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../constants/Colors';

const { height, width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
    },
    headingText: {
        fontSize: 35,
        fontWeight: "500",
        marginVertical: 10,
    },
    overlayContainer: {
        backgroundColor: "#fff",
        width: 4*width/5,
        paddingHorizontal: 15,
    },
    pickGroupCard: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    groupPicture: {
        width: 40, 
        height: 40, 
        borderRadius:50 
    },
    pickGroupCardTextContainer: {
        marginLeft: 10,
    },
    pickGroupCardTextMain: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111",
    },
    pickGroupCardTextSub: {
        fontSize: 12,
        fontWeight: "300",
        color: "#bbb",
    },
    inputText: {
        width: "75%",
        paddingHorizontal: 15,
        paddingVertical: 0,
        borderRadius: 6,
        borderColor: "#bbbbbb",
        borderWidth: 1,
        marginRight: 5,
    },
    createGroupBtn: {
        padding: 10,
        backgroundColor: '#66ff66',
        borderRadius: 6,
        marginVertical: 5,
        marginHorizontal: 1,
    },
    createGroupBtnText: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        fontWeight: "500",
    },
    highlightContainer: {
        width: "100%",
        marginVertical: 2
    },
    formRow: {
        flexDirection:'row',
        marginTop: 8,
        width: "100%",
    },
    selectedFriend: {
        backgroundColor: "#eeeeee",
    },
    unselectedFriend: {
        backgroundColor: "white",
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