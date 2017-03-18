import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from './../../styles'

Hamburger.propTypes = {
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
}

Hamburger.defaultProps = {
  size: 25,
}

export default function Hamburger (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon
        name='ios-menu'
        size={props.size}
        color={'#333'} />
    </TouchableOpacity>
  )
}
