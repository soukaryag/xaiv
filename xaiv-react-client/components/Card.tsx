import React from 'react'
import { View, Text, Image, StyleSheet, ImageSourcePropType, Dimensions } from 'react-native'
import { shape, string, number } from 'prop-types'
const { height } = Dimensions.get('window')

const Card = ({ card }: any) => (
  <View
    activeOpacity={1}
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={card.activity_photo}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>
        {`${card.activity_name}`}
      </Text>
    </View>
  </View>
)

Card.propTypes = {
  card: shape({
    photo: ImageSourcePropType,
    name: string,
    age: number,
  }).isRequired,
}

const styles = StyleSheet.create({
  card: {
    height: height - 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 15,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: '100%',
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
})

export default Card