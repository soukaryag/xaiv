import React from 'react'
import { Image, SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider, Text } from 'react-native-elements'

const { height, width } = Dimensions.get('window')

class ProfileScreen extends React.Component {
  socket: any
  constructor(props: any) {
    super(props);
    this.socket = props.route.params.socket;
  }

  state = {
    overlay: false,
    username: '',
    friends: '',
    profilePicUrl: 'https://website.cs.vt.edu/content/website_cs_vt_edu/en/News/department-spotlights/austin_stout_profile.transform/l-medium/image.jpg',
  };

  componentDidMount() {
    AsyncStorage.getItem("username").then((value) => {
      this.setState({ username: value })
      this.socket.emit("get_friends", value);
    });
    this.socket.on("receive_friends", (friends: string[]) => {
      let tmp = "";
      friends.forEach(function (value) {
        tmp += value + "\n";
      }); 
      this.setState({ friends: tmp });
    });
  }

  toggleOverlay = () => {
    this.setState({ overlay: !this.state.overlay });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: this.state.profilePicUrl }} style={styles.image} />
        </View>
        <Text h4 style={[styles.name]}>{this.state.username}</Text>
        <Text style={[styles.desc]}>Software Engineer at Xaiv</Text>
        <Divider style={[styles.divider]} />
        <Text style={[styles.sectionHeader]}>About Me</Text>
        <Text style={[styles.desc]}>Beep boop bop, badaboom bap bop. POW. byebye doggy.</Text>
        <Divider style={[styles.divider]} />
        <Text style={[styles.sectionHeader]}>Friends</Text>
        <Text style={[styles.friends]}>{this.state.friends}</Text>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: width - 60,
    height: height / 2 - 60,
    borderRadius: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  sectionHeader: {
    color: '#888888',
    marginHorizontal: 30,
    fontSize: 25,
    fontWeight: "600",
  },
  friends: {
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 15,
    fontWeight: "400",
  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: width - 60,
    margin: 20,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
})

export default ProfileScreen