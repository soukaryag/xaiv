import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { func, string } from 'prop-types'
import Icon from 'react-native-vector-icons/AntDesign'

const IconButton = ({ onPress, name, backgroundColor, color, size }: any) => (
    <TouchableOpacity
        style={[styles.singleButton, { backgroundColor }]}
        onPress={onPress}
        activeOpacity={0.85}
    >
        <Icon
            name={name}
            size={size}
            color={color}
        />
    </TouchableOpacity>
)
IconButton.defaultProps = {
    color: 'white',
    backgroundColor: 'red',
}
IconButton.propTypes = {
    onPress: func.isRequired,
    name: string.isRequired,
    color: string,
    backgroundColor: string,
}

const styles = StyleSheet.create({
    singleButton: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 2,
        padding: 15,
    },
})

export default IconButton