import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from './../../styles'

Yay.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

Yay.defaultProps = {
  size: 40,
}

export default function Yay (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon
        name='heart-o'
        size={props.size}
        color={'#6b6490'} />
    </TouchableOpacity>
  )
}
