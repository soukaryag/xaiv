import React from 'react'
import { Image, SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import { Divider, Icon, Text } from 'react-native-elements'

const { height, width } = Dimensions.get('window')

const Social = ({ name }: any) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
)

class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: "https://pbs.twimg.com/profile_images/865785147693649920/_x3PGTDL_400x400.jpg" }} style={styles.image} />
        </View>
        <Text h4 style={styles.name}>
          {"Soukarya Ghosh"}
        </Text>
        <Text style={styles.desc}>Software Engineer at Xaiv</Text>
        <Divider style={styles.divider} />
        <Text style={styles.desc}>
          I love to travel. I have a cat named pickles, if he likes you, I
          probably will too.
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.desc}>Find me on Social here</Text>
        <View style={styles.socialLinks}>
          <Social name="snapchat" />
          <Social name="instagram" />
          <Social name="facebook-square" />
        </View>
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
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
})

export default ProfileScreen