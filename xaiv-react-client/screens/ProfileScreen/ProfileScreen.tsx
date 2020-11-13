import React from 'react'
import { Image, SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import { Divider, Icon, Text } from 'react-native-elements'

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
  };

  componentDidMount() {
    this.setState({ username: localStorage.getItem("username") })
  }

  toggleOverlay = () => {
    this.setState({ overlay: !this.state.overlay });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" }} style={styles.image} />
        </View>
        <Text h4 style={styles.name}>
          {this.state.username}
        </Text>
        <Text style={styles.desc}>Software Engineer at Xaiv</Text>
        <Divider style={[styles.divider]} />
        <Text style={styles.desc}>
          Beep boop bop, badaboom bap bop. POW. byebye doggy.
        </Text>
        <Divider style={[styles.divider]} />
        <Text style={styles.desc}>Find me on Social here</Text>

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